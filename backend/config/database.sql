-- ============================================================================
-- MODESTA RESORT - ULTIMATE LUXURY RESORT DATABASE SCHEMA
-- ============================================================================
-- This schema supports a world-class resort management system with
-- comprehensive features for bookings, guest management, staff operations,
-- loyalty programs, and analytics.
-- ============================================================================

DROP DATABASE IF EXISTS modesta_resort;
CREATE DATABASE modesta_resort CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modesta_resort;

-- ============================================================================
-- USERS & AUTHENTICATION
-- ============================================================================

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    uuid VARCHAR(36) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('guest', 'staff', 'admin', 'super_admin') DEFAULT 'guest',
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    country_code VARCHAR(5),
    date_of_birth DATE,
    nationality VARCHAR(100),
    passport_number VARCHAR(50),
    passport_expiry DATE,
    profile_image VARCHAR(255),
    preferred_language VARCHAR(10) DEFAULT 'en',
    preferred_currency VARCHAR(3) DEFAULT 'USD',
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    email_notifications BOOLEAN DEFAULT TRUE,
    sms_notifications BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_uuid (uuid),
    INDEX idx_role (role)
) ENGINE=InnoDB;

CREATE TABLE refresh_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

CREATE TABLE password_resets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token)
) ENGINE=InnoDB;

-- ============================================================================
-- GUEST PROFILES & PREFERENCES
-- ============================================================================

CREATE TABLE guest_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100),
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    dietary_preferences TEXT,
    accessibility_requirements TEXT,
    special_requests TEXT,
    vip_status BOOLEAN DEFAULT FALSE,
    vip_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE guest_preferences (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    preference_type ENUM('pillow', 'room_temperature', 'floor_level', 'view', 'other') NOT NULL,
    preference_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

-- ============================================================================
-- LOYALTY PROGRAM
-- ============================================================================

CREATE TABLE loyalty_tiers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tier_name VARCHAR(50) UNIQUE NOT NULL,
    tier_level INT UNIQUE NOT NULL,
    min_points INT NOT NULL,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    benefits TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE loyalty_accounts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    tier_id INT DEFAULT 1,
    total_points INT DEFAULT 0,
    lifetime_points INT DEFAULT 0,
    member_since DATE NOT NULL,
    tier_updated_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tier_id) REFERENCES loyalty_tiers(id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

CREATE TABLE loyalty_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    loyalty_account_id INT NOT NULL,
    transaction_type ENUM('earn', 'redeem', 'expire', 'adjust') NOT NULL,
    points INT NOT NULL,
    description VARCHAR(255),
    reference_type VARCHAR(50),
    reference_id INT,
    balance_after INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loyalty_account_id) REFERENCES loyalty_accounts(id) ON DELETE CASCADE,
    INDEX idx_loyalty_account_id (loyalty_account_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- ============================================================================
-- ROOMS & ACCOMMODATIONS
-- ============================================================================

CREATE TABLE room_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    category_slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    size_sqm INT,
    max_occupancy INT NOT NULL,
    max_adults INT NOT NULL,
    max_children INT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    weekend_price DECIMAL(10,2),
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (category_slug),
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_number VARCHAR(20) UNIQUE NOT NULL,
    category_id INT NOT NULL,
    floor_number INT NOT NULL,
    view_type ENUM('ocean', 'garden', 'pool', 'mountain', 'city', 'courtyard') NOT NULL,
    status ENUM('available', 'occupied', 'maintenance', 'cleaning', 'reserved') DEFAULT 'available',
    is_active BOOLEAN DEFAULT TRUE,
    last_maintenance DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES room_categories(id),
    INDEX idx_room_number (room_number),
    INDEX idx_category_id (category_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

CREATE TABLE room_amenities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    amenity_name VARCHAR(100) UNIQUE NOT NULL,
    amenity_icon VARCHAR(100),
    category ENUM('basic', 'entertainment', 'bathroom', 'comfort', 'technology', 'other') DEFAULT 'basic',
    sort_order INT DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE room_category_amenities (
    category_id INT NOT NULL,
    amenity_id INT NOT NULL,
    PRIMARY KEY (category_id, amenity_id),
    FOREIGN KEY (category_id) REFERENCES room_categories(id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id) REFERENCES room_amenities(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE room_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    image_type ENUM('main', 'gallery', 'virtual_tour', 'floor_plan') DEFAULT 'gallery',
    title VARCHAR(255),
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES room_categories(id) ON DELETE CASCADE,
    INDEX idx_category_id (category_id)
) ENGINE=InnoDB;

-- ============================================================================
-- PRICING & SEASONS
-- ============================================================================

CREATE TABLE seasons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    season_name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_multiplier DECIMAL(5,2) DEFAULT 1.00,
    is_peak BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB;

CREATE TABLE dynamic_pricing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    date DATE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    occupancy_rate DECIMAL(5,2),
    min_nights INT DEFAULT 1,
    notes VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES room_categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_category_date (category_id, date),
    INDEX idx_date (date)
) ENGINE=InnoDB;

-- ============================================================================
-- PACKAGES & PROMOTIONS
-- ============================================================================

CREATE TABLE packages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    package_name VARCHAR(200) NOT NULL,
    package_slug VARCHAR(200) UNIQUE NOT NULL,
    package_type ENUM('honeymoon', 'family', 'corporate', 'wellness', 'adventure', 'romance', 'other') NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_nights INT NOT NULL,
    max_guests INT NOT NULL,
    includes TEXT,
    terms_conditions TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from DATE,
    valid_until DATE,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (package_slug),
    INDEX idx_type (package_type),
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE promotions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    promo_code VARCHAR(50) UNIQUE NOT NULL,
    promo_name VARCHAR(200) NOT NULL,
    description TEXT,
    discount_type ENUM('percentage', 'fixed', 'free_nights') NOT NULL,
    discount_value DECIMAL(10,2) NOT NULL,
    min_nights INT DEFAULT 1,
    min_amount DECIMAL(10,2) DEFAULT 0,
    max_uses INT,
    used_count INT DEFAULT 0,
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code (promo_code),
    INDEX idx_dates (valid_from, valid_until)
) ENGINE=InnoDB;

-- ============================================================================
-- BOOKINGS
-- ============================================================================

CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    user_id INT NOT NULL,
    room_id INT,
    category_id INT NOT NULL,
    package_id INT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    adults INT NOT NULL,
    children INT DEFAULT 0,
    status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled', 'no_show') DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    taxes DECIMAL(10,2) DEFAULT 0,
    service_charges DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    promo_code VARCHAR(50),
    loyalty_points_used INT DEFAULT 0,
    loyalty_points_earned INT DEFAULT 0,
    special_requests TEXT,
    arrival_time TIME,
    guest_notes TEXT,
    internal_notes TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP NULL,
    checked_in_at TIMESTAMP NULL,
    checked_out_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES room_categories(id),
    FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL,
    INDEX idx_reference (booking_reference),
    INDEX idx_user_id (user_id),
    INDEX idx_dates (check_in, check_out),
    INDEX idx_status (status)
) ENGINE=InnoDB;

CREATE TABLE booking_guests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    age_group ENUM('adult', 'child', 'infant') DEFAULT 'adult',
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking_id (booking_id)
) ENGINE=InnoDB;

CREATE TABLE booking_addons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    addon_type ENUM('airport_transfer', 'spa', 'excursion', 'dining', 'activity', 'other') NOT NULL,
    addon_name VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    addon_date DATE,
    addon_time TIME,
    notes TEXT,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_booking_id (booking_id)
) ENGINE=InnoDB;

-- ============================================================================
-- PAYMENTS
-- ============================================================================

CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    payment_reference VARCHAR(50) UNIQUE NOT NULL,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    payment_method ENUM('card', 'bank_transfer', 'cash', 'wallet', 'loyalty_points') NOT NULL,
    payment_status ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded') DEFAULT 'pending',
    stripe_payment_intent_id VARCHAR(255),
    stripe_charge_id VARCHAR(255),
    card_last4 VARCHAR(4),
    card_brand VARCHAR(20),
    transaction_fee DECIMAL(10,2) DEFAULT 0,
    refund_amount DECIMAL(10,2) DEFAULT 0,
    refund_reason TEXT,
    payment_date TIMESTAMP NULL,
    refund_date TIMESTAMP NULL,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_reference (payment_reference),
    INDEX idx_booking_id (booking_id),
    INDEX idx_status (payment_status)
) ENGINE=InnoDB;

-- ============================================================================
-- SERVICES & AMENITIES
-- ============================================================================

CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_name VARCHAR(200) NOT NULL,
    service_type ENUM('spa', 'dining', 'activity', 'transport', 'events', 'other') NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_minutes INT,
    capacity INT,
    requires_booking BOOLEAN DEFAULT TRUE,
    advance_booking_hours INT DEFAULT 24,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (service_type),
    INDEX idx_active (is_active)
) ENGINE=InnoDB;

CREATE TABLE service_availability (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT NOT NULL,
    day_of_week TINYINT NOT NULL, -- 0=Sunday, 6=Saturday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    INDEX idx_service_id (service_id)
) ENGINE=InnoDB;

CREATE TABLE service_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    service_id INT NOT NULL,
    user_id INT NOT NULL,
    booking_id INT,
    service_date DATE NOT NULL,
    service_time TIME NOT NULL,
    guests INT DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show') DEFAULT 'pending',
    special_requests TEXT,
    cancelled_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    INDEX idx_service_id (service_id),
    INDEX idx_user_id (user_id),
    INDEX idx_date (service_date)
) ENGINE=InnoDB;

-- ============================================================================
-- DINING & RESTAURANTS
-- ============================================================================

CREATE TABLE restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_name VARCHAR(200) NOT NULL,
    cuisine_type VARCHAR(100),
    description TEXT,
    capacity INT NOT NULL,
    dress_code VARCHAR(255),
    opening_time TIME NOT NULL,
    closing_time TIME NOT NULL,
    price_range ENUM('$', '$$', '$$$', '$$$$') DEFAULT '$$',
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE restaurant_tables (
    id INT PRIMARY KEY AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    table_number VARCHAR(20) NOT NULL,
    seats INT NOT NULL,
    table_type ENUM('indoor', 'outdoor', 'private', 'bar') DEFAULT 'indoor',
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
    UNIQUE KEY unique_restaurant_table (restaurant_id, table_number)
) ENGINE=InnoDB;

CREATE TABLE restaurant_reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_reference VARCHAR(20) UNIQUE NOT NULL,
    restaurant_id INT NOT NULL,
    table_id INT,
    user_id INT NOT NULL,
    booking_id INT,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests INT NOT NULL,
    status ENUM('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show') DEFAULT 'pending',
    special_requests TEXT,
    occasion VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    FOREIGN KEY (table_id) REFERENCES restaurant_tables(id) ON DELETE SET NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    INDEX idx_restaurant_id (restaurant_id),
    INDEX idx_date (reservation_date)
) ENGINE=InnoDB;

CREATE TABLE room_service_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_reference VARCHAR(20) UNIQUE NOT NULL,
    booking_id INT NOT NULL,
    room_id INT NOT NULL,
    order_items JSON NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    service_charge DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'preparing', 'delivering', 'delivered', 'cancelled') DEFAULT 'pending',
    delivery_time TIMESTAMP NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    INDEX idx_booking_id (booking_id),
    INDEX idx_status (status)
) ENGINE=InnoDB;

-- ============================================================================
-- EVENTS & WEDDINGS
-- ============================================================================

CREATE TABLE event_venues (
    id INT PRIMARY KEY AUTO_INCREMENT,
    venue_name VARCHAR(200) NOT NULL,
    venue_type ENUM('ballroom', 'conference', 'outdoor', 'garden', 'beach', 'rooftop') NOT NULL,
    capacity INT NOT NULL,
    size_sqm INT,
    description TEXT,
    amenities TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    floor_plan_url VARCHAR(500),
    virtual_tour_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE event_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    venue_id INT NOT NULL,
    user_id INT NOT NULL,
    event_type ENUM('wedding', 'corporate', 'conference', 'party', 'other') NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    expected_guests INT NOT NULL,
    setup_type VARCHAR(100),
    catering_required BOOLEAN DEFAULT FALSE,
    av_equipment_required BOOLEAN DEFAULT FALSE,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('inquiry', 'quoted', 'confirmed', 'completed', 'cancelled') DEFAULT 'inquiry',
    special_requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES event_venues(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_venue_id (venue_id),
    INDEX idx_date (event_date)
) ENGINE=InnoDB;

-- ============================================================================
-- REVIEWS & RATINGS
-- ============================================================================

CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT NOT NULL,
    user_id INT NOT NULL,
    overall_rating DECIMAL(3,2) NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    room_rating DECIMAL(3,2) CHECK (room_rating >= 1 AND room_rating <= 5),
    service_rating DECIMAL(3,2) CHECK (service_rating >= 1 AND service_rating <= 5),
    cleanliness_rating DECIMAL(3,2) CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    amenities_rating DECIMAL(3,2) CHECK (amenities_rating >= 1 AND amenities_rating <= 5),
    location_rating DECIMAL(3,2) CHECK (location_rating >= 1 AND location_rating <= 5),
    value_rating DECIMAL(3,2) CHECK (value_rating >= 1 AND value_rating <= 5),
    title VARCHAR(255),
    review_text TEXT,
    pros TEXT,
    cons TEXT,
    would_recommend BOOLEAN DEFAULT TRUE,
    trip_type ENUM('business', 'couple', 'family', 'friends', 'solo') NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    helpful_count INT DEFAULT 0,
    admin_response TEXT,
    responded_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_booking_id (booking_id),
    INDEX idx_user_id (user_id),
    INDEX idx_approved (is_approved),
    INDEX idx_rating (overall_rating)
) ENGINE=InnoDB;

CREATE TABLE review_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    review_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    INDEX idx_review_id (review_id)
) ENGINE=InnoDB;

-- ============================================================================
-- STAFF & OPERATIONS
-- ============================================================================

CREATE TABLE staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    department ENUM('front_desk', 'housekeeping', 'maintenance', 'food_beverage', 'spa', 'activities', 'management', 'security', 'other') NOT NULL,
    position VARCHAR(100) NOT NULL,
    hire_date DATE NOT NULL,
    salary DECIMAL(10,2),
    is_active BOOLEAN DEFAULT TRUE,
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_employee_id (employee_id),
    INDEX idx_department (department)
) ENGINE=InnoDB;

CREATE TABLE staff_schedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    staff_id INT NOT NULL,
    shift_date DATE NOT NULL,
    shift_start TIME NOT NULL,
    shift_end TIME NOT NULL,
    shift_type ENUM('morning', 'afternoon', 'night', 'full_day') NOT NULL,
    status ENUM('scheduled', 'confirmed', 'completed', 'absent') DEFAULT 'scheduled',
    notes TEXT,
    FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE,
    INDEX idx_staff_id (staff_id),
    INDEX idx_date (shift_date)
) ENGINE=InnoDB;

CREATE TABLE housekeeping_tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT NOT NULL,
    assigned_to INT,
    task_type ENUM('daily_cleaning', 'checkout_cleaning', 'deep_cleaning', 'maintenance', 'inspection') NOT NULL,
    priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
    status ENUM('pending', 'in_progress', 'completed', 'blocked') DEFAULT 'pending',
    scheduled_date DATE NOT NULL,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    notes TEXT,
    inspection_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (assigned_to) REFERENCES staff(id) ON DELETE SET NULL,
    INDEX idx_room_id (room_id),
    INDEX idx_assigned_to (assigned_to),
    INDEX idx_status (status),
    INDEX idx_date (scheduled_date)
) ENGINE=InnoDB;

CREATE TABLE maintenance_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_number VARCHAR(20) UNIQUE NOT NULL,
    room_id INT,
    location VARCHAR(255),
    category ENUM('electrical', 'plumbing', 'hvac', 'furniture', 'appliance', 'structural', 'other') NOT NULL,
    priority ENUM('low', 'normal', 'high', 'emergency') DEFAULT 'normal',
    description TEXT NOT NULL,
    reported_by INT NOT NULL,
    assigned_to INT,
    status ENUM('open', 'assigned', 'in_progress', 'completed', 'cancelled') DEFAULT 'open',
    resolution TEXT,
    cost DECIMAL(10,2) DEFAULT 0,
    started_at TIMESTAMP NULL,
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL,
    FOREIGN KEY (reported_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES staff(id) ON DELETE SET NULL,
    INDEX idx_request_number (request_number),
    INDEX idx_status (status),
    INDEX idx_priority (priority)
) ENGINE=InnoDB;

-- ============================================================================
-- INVENTORY MANAGEMENT
-- ============================================================================

CREATE TABLE inventory_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
) ENGINE=InnoDB;

CREATE TABLE inventory_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    description TEXT,
    unit_of_measure VARCHAR(50),
    unit_cost DECIMAL(10,2),
    reorder_level INT DEFAULT 0,
    current_stock INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES inventory_categories(id),
    INDEX idx_item_code (item_code),
    INDEX idx_category_id (category_id)
) ENGINE=InnoDB;

CREATE TABLE inventory_transactions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    item_id INT NOT NULL,
    transaction_type ENUM('purchase', 'usage', 'adjustment', 'return', 'waste') NOT NULL,
    quantity INT NOT NULL,
    unit_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    reference_type VARCHAR(50),
    reference_id INT,
    performed_by INT NOT NULL,
    notes TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES inventory_items(id),
    FOREIGN KEY (performed_by) REFERENCES users(id),
    INDEX idx_item_id (item_id),
    INDEX idx_transaction_date (transaction_date)
) ENGINE=InnoDB;

-- ============================================================================
-- COMMUNICATIONS
-- ============================================================================

CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    conversation_id VARCHAR(36) NOT NULL,
    sender_id INT NOT NULL,
    recipient_id INT,
    message_type ENUM('guest_to_staff', 'staff_to_guest', 'internal', 'system') DEFAULT 'guest_to_staff',
    subject VARCHAR(255),
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    parent_message_id INT,
    attachments JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_message_id) REFERENCES messages(id) ON DELETE CASCADE,
    INDEX idx_conversation_id (conversation_id),
    INDEX idx_sender_id (sender_id),
    INDEX idx_recipient_id (recipient_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    notification_type ENUM('booking', 'payment', 'reminder', 'promotion', 'system', 'other') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

CREATE TABLE email_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    recipient_email VARCHAR(255) NOT NULL,
    email_type VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    template_name VARCHAR(100),
    status ENUM('queued', 'sent', 'failed', 'bounced') DEFAULT 'queued',
    provider_message_id VARCHAR(255),
    error_message TEXT,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- ============================================================================
-- CONTENT MANAGEMENT
-- ============================================================================

CREATE TABLE gallery (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    category ENUM('rooms', 'dining', 'spa', 'activities', 'facilities', 'events', 'general') NOT NULL,
    tags VARCHAR(500),
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id),
    INDEX idx_category (category),
    INDEX idx_featured (is_featured)
) ENGINE=InnoDB;

CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(500),
    author_id INT NOT NULL,
    category VARCHAR(100),
    tags VARCHAR(500),
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    views INT DEFAULT 0,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    INDEX idx_slug (slug),
    INDEX idx_status (status),
    INDEX idx_published_at (published_at)
) ENGINE=InnoDB;

CREATE TABLE attractions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    attraction_name VARCHAR(255) NOT NULL,
    category ENUM('nature', 'culture', 'shopping', 'dining', 'entertainment', 'sports', 'historical') NOT NULL,
    description TEXT,
    address VARCHAR(500),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    distance_km DECIMAL(5,2),
    travel_time_minutes INT,
    opening_hours VARCHAR(255),
    entry_fee VARCHAR(100),
    image_url VARCHAR(500),
    website VARCHAR(500),
    phone VARCHAR(20),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================================
-- ANALYTICS & REPORTING
-- ============================================================================

CREATE TABLE analytics_daily (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_date DATE UNIQUE NOT NULL,
    total_bookings INT DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    occupancy_rate DECIMAL(5,2) DEFAULT 0,
    adr DECIMAL(10,2) DEFAULT 0, -- Average Daily Rate
    revpar DECIMAL(10,2) DEFAULT 0, -- Revenue Per Available Room
    new_guests INT DEFAULT 0,
    returning_guests INT DEFAULT 0,
    cancellations INT DEFAULT 0,
    no_shows INT DEFAULT 0,
    average_stay_length DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_report_date (report_date)
) ENGINE=InnoDB;

CREATE TABLE revenue_breakdown (
    id INT PRIMARY KEY AUTO_INCREMENT,
    report_date DATE NOT NULL,
    revenue_source ENUM('accommodation', 'food_beverage', 'spa', 'activities', 'events', 'other') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_report_date (report_date),
    INDEX idx_source (revenue_source)
) ENGINE=InnoDB;

-- ============================================================================
-- SYSTEM SETTINGS & CONFIGURATION
-- ============================================================================

CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_key (setting_key)
) ENGINE=InnoDB;

CREATE TABLE activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id INT,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_entity (entity_type, entity_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB;

-- ============================================================================
-- WISHLISTS
-- ============================================================================

CREATE TABLE wishlists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES room_categories(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_category (user_id, category_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB;

-- ============================================================================
-- INITIAL DATA INSERTION
-- ============================================================================

-- Insert default loyalty tiers
INSERT INTO loyalty_tiers (tier_name, tier_level, min_points, discount_percentage, benefits) VALUES
('Bronze', 1, 0, 0.00, 'Welcome amenity, Priority check-in'),
('Silver', 2, 1000, 5.00, 'Bronze benefits + Room upgrade (subject to availability), Late checkout'),
('Gold', 3, 5000, 10.00, 'Silver benefits + Complimentary breakfast, Spa discount 15%'),
('Platinum', 4, 15000, 15.00, 'Gold benefits + Airport transfer, Exclusive lounge access'),
('Diamond', 5, 30000, 20.00, 'Platinum benefits + Personal concierge, Guaranteed room availability');

-- Insert default room amenities
INSERT INTO room_amenities (amenity_name, amenity_icon, category, sort_order) VALUES
('King Size Bed', 'bed', 'basic', 1),
('Air Conditioning', 'ac_unit', 'comfort', 2),
('Free WiFi', 'wifi', 'technology', 3),
('Smart TV', 'tv', 'entertainment', 4),
('Mini Bar', 'local_bar', 'basic', 5),
('Coffee Maker', 'coffee', 'basic', 6),
('Safe', 'lock', 'basic', 7),
('Bathrobe & Slippers', 'spa', 'bathroom', 8),
('Hair Dryer', 'air', 'bathroom', 9),
('Rainfall Shower', 'shower', 'bathroom', 10),
('Private Balcony', 'balcony', 'other', 11),
('Ocean View', 'waves', 'other', 12),
('Work Desk', 'desk', 'comfort', 13),
('Bluetooth Speaker', 'speaker', 'entertainment', 14),
('Premium Toiletries', 'soap', 'bathroom', 15);

-- Insert default inventory categories
INSERT INTO inventory_categories (category_name, description) VALUES
('Linens', 'Bed sheets, towels, bathrobes'),
('Amenities', 'Toiletries, minibar items, coffee supplies'),
('Cleaning', 'Cleaning supplies and equipment'),
('Maintenance', 'Tools and spare parts'),
('Food & Beverage', 'Restaurant and bar supplies'),
('Office', 'Stationery and office supplies');

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('resort_name', 'Modesta Resort', 'string', 'Resort name', TRUE),
('resort_email', 'info@modestaresort.com', 'string', 'Contact email', TRUE),
('resort_phone', '+1-555-MODESTA', 'string', 'Contact phone', TRUE),
('check_in_time', '15:00', 'string', 'Default check-in time', TRUE),
('check_out_time', '11:00', 'string', 'Default check-out time', TRUE),
('cancellation_hours', '48', 'number', 'Hours before check-in for free cancellation', TRUE),
('tax_rate', '10', 'number', 'Tax percentage', FALSE),
('service_charge_rate', '15', 'number', 'Service charge percentage', FALSE),
('loyalty_points_rate', '100', 'number', 'Points earned per $100 spent', FALSE),
('currency_default', 'USD', 'string', 'Default currency', TRUE),
('min_booking_advance_hours', '24', 'number', 'Minimum hours in advance for booking', TRUE);

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

CREATE VIEW v_occupancy_by_date AS
SELECT
    dates.date,
    COUNT(DISTINCT r.id) as total_rooms,
    COUNT(DISTINCT CASE WHEN b.status IN ('confirmed', 'checked_in') THEN b.room_id END) as occupied_rooms,
    ROUND((COUNT(DISTINCT CASE WHEN b.status IN ('confirmed', 'checked_in') THEN b.room_id END) * 100.0 / COUNT(DISTINCT r.id)), 2) as occupancy_rate
FROM
    (SELECT CURDATE() + INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as date
     FROM (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS a
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS b
     CROSS JOIN (SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9) AS c
    ) dates
CROSS JOIN rooms r
LEFT JOIN bookings b ON r.id = b.room_id
    AND dates.date BETWEEN b.check_in AND DATE_SUB(b.check_out, INTERVAL 1 DAY)
WHERE dates.date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 365 DAY)
    AND r.is_active = TRUE
GROUP BY dates.date;

CREATE VIEW v_revenue_by_month AS
SELECT
    DATE_FORMAT(b.check_in, '%Y-%m') as month,
    COUNT(*) as total_bookings,
    SUM(b.total_amount) as total_revenue,
    AVG(b.total_amount) as average_booking_value,
    SUM(b.nights) as total_room_nights
FROM bookings b
WHERE b.status IN ('confirmed', 'checked_in', 'checked_out')
GROUP BY DATE_FORMAT(b.check_in, '%Y-%m')
ORDER BY month DESC;

CREATE VIEW v_top_guests AS
SELECT
    u.id,
    u.first_name,
    u.last_name,
    u.email,
    COUNT(b.id) as total_bookings,
    SUM(b.total_amount) as lifetime_value,
    la.total_points,
    lt.tier_name
FROM users u
LEFT JOIN bookings b ON u.id = b.user_id AND b.status IN ('confirmed', 'checked_in', 'checked_out')
LEFT JOIN loyalty_accounts la ON u.id = la.user_id
LEFT JOIN loyalty_tiers lt ON la.tier_id = lt.id
GROUP BY u.id
ORDER BY lifetime_value DESC;

-- ============================================================================
-- STORED PROCEDURES
-- ============================================================================

DELIMITER //

CREATE PROCEDURE sp_check_room_availability(
    IN p_category_id INT,
    IN p_check_in DATE,
    IN p_check_out DATE
)
BEGIN
    SELECT r.id, r.room_number, r.floor_number, r.view_type
    FROM rooms r
    WHERE r.category_id = p_category_id
        AND r.is_active = TRUE
        AND r.status = 'available'
        AND r.id NOT IN (
            SELECT DISTINCT room_id
            FROM bookings
            WHERE room_id IS NOT NULL
                AND status IN ('confirmed', 'checked_in')
                AND (
                    (check_in <= p_check_in AND check_out > p_check_in)
                    OR (check_in < p_check_out AND check_out >= p_check_out)
                    OR (check_in >= p_check_in AND check_out <= p_check_out)
                )
        );
END //

CREATE PROCEDURE sp_calculate_booking_price(
    IN p_category_id INT,
    IN p_check_in DATE,
    IN p_check_out DATE,
    IN p_promo_code VARCHAR(50),
    OUT p_subtotal DECIMAL(10,2),
    OUT p_discount DECIMAL(10,2),
    OUT p_total DECIMAL(10,2)
)
BEGIN
    DECLARE v_nights INT;
    DECLARE v_base_price DECIMAL(10,2);
    DECLARE v_discount_value DECIMAL(10,2);
    DECLARE v_discount_type VARCHAR(20);

    SET v_nights = DATEDIFF(p_check_out, p_check_in);

    SELECT base_price INTO v_base_price
    FROM room_categories
    WHERE id = p_category_id;

    SET p_subtotal = v_base_price * v_nights;
    SET p_discount = 0;

    IF p_promo_code IS NOT NULL THEN
        SELECT discount_type, discount_value INTO v_discount_type, v_discount_value
        FROM promotions
        WHERE promo_code = p_promo_code
            AND is_active = TRUE
            AND CURDATE() BETWEEN valid_from AND valid_until
            AND v_nights >= min_nights
        LIMIT 1;

        IF v_discount_type = 'percentage' THEN
            SET p_discount = p_subtotal * (v_discount_value / 100);
        ELSEIF v_discount_type = 'fixed' THEN
            SET p_discount = v_discount_value;
        END IF;
    END IF;

    SET p_total = p_subtotal - p_discount;
END //

DELIMITER ;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

DELIMITER //

CREATE TRIGGER trg_booking_after_insert
AFTER INSERT ON bookings
FOR EACH ROW
BEGIN
    -- Award loyalty points
    IF NEW.status IN ('confirmed', 'checked_in', 'checked_out') THEN
        UPDATE loyalty_accounts la
        SET total_points = total_points + FLOOR(NEW.total_amount / 10),
            lifetime_points = lifetime_points + FLOOR(NEW.total_amount / 10)
        WHERE user_id = NEW.user_id;
    END IF;

    -- Update room status
    IF NEW.room_id IS NOT NULL AND NEW.status = 'confirmed' THEN
        UPDATE rooms SET status = 'reserved' WHERE id = NEW.room_id;
    END IF;
END //

CREATE TRIGGER trg_booking_after_update
AFTER UPDATE ON bookings
FOR EACH ROW
BEGIN
    -- Update room status based on booking status
    IF OLD.status != NEW.status THEN
        IF NEW.status = 'checked_in' AND NEW.room_id IS NOT NULL THEN
            UPDATE rooms SET status = 'occupied' WHERE id = NEW.room_id;
        ELSEIF NEW.status = 'checked_out' AND NEW.room_id IS NOT NULL THEN
            UPDATE rooms SET status = 'cleaning' WHERE id = NEW.room_id;
        ELSEIF NEW.status = 'cancelled' AND NEW.room_id IS NOT NULL THEN
            UPDATE rooms SET status = 'available' WHERE id = NEW.room_id;
        END IF;
    END IF;
END //

CREATE TRIGGER trg_payment_after_update
AFTER UPDATE ON payments
FOR EACH ROW
BEGIN
    -- Update booking status when payment is completed
    IF OLD.payment_status != NEW.payment_status AND NEW.payment_status = 'completed' THEN
        UPDATE bookings
        SET status = 'confirmed'
        WHERE id = NEW.booking_id AND status = 'pending';
    END IF;
END //

CREATE TRIGGER trg_review_after_insert
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    -- Mark booking as reviewed
    UPDATE bookings
    SET internal_notes = CONCAT(IFNULL(internal_notes, ''), '\nReviewed on ', CURRENT_TIMESTAMP)
    WHERE id = NEW.booking_id;
END //

DELIMITER ;

-- ============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================================

-- These are additional composite indexes for complex queries
CREATE INDEX idx_bookings_dates_status ON bookings(check_in, check_out, status);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_payments_booking_status ON payments(booking_id, payment_status);
CREATE INDEX idx_reviews_approved_rating ON reviews(is_approved, overall_rating);
CREATE INDEX idx_rooms_category_status ON rooms(category_id, status);

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================

SELECT 'Database schema created successfully!' as status;
