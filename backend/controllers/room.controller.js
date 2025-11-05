/**
 * Room Controller for Modesta Resort
 *
 * Handles room categories, availability, and room management
 */

import { executeQuery } from '../config/database.js';
import { ApiError } from '../middleware/error.middleware.js';
import { setCache, getCache } from '../config/redis.js';

/**
 * Get all room categories
 * @route GET /api/v1/rooms/categories
 * @access Public
 */
export const getRoomCategories = async (req, res) => {
  const cacheKey = 'room_categories:all';
  let categories = await getCache(cacheKey);

  if (!categories) {
    categories = await executeQuery(
      `SELECT
        rc.id, rc.category_name, rc.category_slug, rc.description, rc.short_description,
        rc.size_sqm, rc.max_occupancy, rc.max_adults, rc.max_children, rc.base_price,
        rc.weekend_price,
        (SELECT COUNT(*) FROM rooms WHERE category_id = rc.id AND is_active = TRUE) as total_rooms
       FROM room_categories rc
       WHERE rc.is_active = TRUE
       ORDER BY rc.sort_order, rc.base_price`
    );

    // Get amenities for each category
    for (let category of categories) {
      const amenities = await executeQuery(
        `SELECT ra.id, ra.amenity_name, ra.amenity_icon, ra.category
         FROM room_amenities ra
         JOIN room_category_amenities rca ON ra.id = rca.amenity_id
         WHERE rca.category_id = ?
         ORDER BY ra.sort_order`,
        [category.id]
      );

      const images = await executeQuery(
        `SELECT id, image_url, image_type, title, sort_order
         FROM room_images
         WHERE category_id = ?
         ORDER BY sort_order, image_type`,
        [category.id]
      );

      category.amenities = amenities;
      category.images = images;
    }

    await setCache(cacheKey, categories, 3600); // Cache for 1 hour
  }

  res.json({
    success: true,
    data: { categories },
  });
};

/**
 * Get single room category
 * @route GET /api/v1/rooms/categories/:slug
 * @access Public
 */
export const getRoomCategory = async (req, res) => {
  const { slug } = req.params;

  const [category] = await executeQuery(
    `SELECT * FROM room_categories WHERE category_slug = ? AND is_active = TRUE`,
    [slug]
  );

  if (!category) {
    throw new ApiError(404, 'Room category not found');
  }

  // Get amenities
  const amenities = await executeQuery(
    `SELECT ra.* FROM room_amenities ra
     JOIN room_category_amenities rca ON ra.id = rca.amenity_id
     WHERE rca.category_id = ?`,
    [category.id]
  );

  // Get images
  const images = await executeQuery(
    'SELECT * FROM room_images WHERE category_id = ? ORDER BY sort_order',
    [category.id]
  );

  res.json({
    success: true,
    data: {
      category: {
        ...category,
        amenities,
        images,
      },
    },
  });
};

/**
 * Check availability
 * @route POST /api/v1/rooms/check-availability
 * @access Public
 */
export const checkAvailability = async (req, res) => {
  const { categoryId, checkIn, checkOut, guests } = req.body;

  // Call stored procedure to check availability
  const availableRooms = await executeQuery(
    'CALL sp_check_room_availability(?, ?, ?)',
    [categoryId, checkIn, checkOut]
  );

  res.json({
    success: true,
    data: {
      available: availableRooms[0].length > 0,
      count: availableRooms[0].length,
      rooms: availableRooms[0],
    },
  });
};

export default {
  getRoomCategories,
  getRoomCategory,
  checkAvailability,
};
