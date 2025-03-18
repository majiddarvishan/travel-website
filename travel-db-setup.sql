-- Create Places table
CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    place_id INTEGER NOT NULL,
    user_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (place_id) REFERENCES places (id) ON DELETE CASCADE
);

-- Insert sample places
INSERT INTO places (name, description, location, image_url, views) VALUES
    ('Bali Beach', 'Beautiful tropical paradise with crystal clear waters. Perfect for swimming, surfing, and relaxation. The local culture and cuisine add an authentic touch to your experience.', 'Bali, Indonesia', '/images/bali.jpg', 120),
    ('Swiss Alps', 'Majestic mountains with breathtaking views. A paradise for hikers in summer and skiers in winter. The clean mountain air and stunning panoramas will rejuvenate your spirit.', 'Switzerland', '/images/swiss-alps.jpg', 95),
    ('Santorini', 'Iconic white buildings with blue domes overlooking the sea. Famous for its stunning sunsets, volcanic beaches, and charming villages built into cliff sides. A romantic getaway destination.', 'Greece', '/images/santorini.jpg', 150),
    ('Grand Canyon', 'One of the most spectacular natural wonders of the world. The massive canyon with layered bands of red rock revealing millions of years of geological history. Perfect for hiking and photography.', 'Arizona, USA', '/images/grand-canyon.jpg', 200),
    ('Kyoto Gardens', 'Traditional Japanese gardens with peaceful ambiance. Experience Zen tranquility among meticulously maintained landscapes featuring koi ponds, stone pathways, and ancient temples.', 'Kyoto, Japan', '/images/kyoto.jpg', 85),
    ('Machu Picchu', 'Ancient Incan citadel set high in the Andes Mountains. This archaeological wonder showcases incredible stonework and engineering by a civilization from the 15th century.', 'Peru', '/images/machu-picchu.jpg', 175),
    ('Northern Lights', 'Natural light display in the Earths sky, predominantly seen in high-latitude regions. This breathtaking phenomenon of colliding atmospheric particles creates dancing waves of colorful light.', 'Iceland', '/images/northern-lights.jpg', 110),
    ('Great Barrier Reef', 'Worlds largest coral reef system composed of over 2,900 individual reefs. Home to countless species of colorful fish, mollusks, starfish, turtles, dolphins and sharks.', 'Queensland, Australia', '/images/great-barrier-reef.jpg', 130);

-- Insert sample reviews
INSERT INTO reviews (place_id, user_name, rating, comment) VALUES
    (1, 'TravelFan', 5, 'The most beautiful beach Ive ever visited! The water is crystal clear and the sand is perfectly white. Local food was amazing too.'),
    (1, 'Adventurer123', 4, 'Great place to relax and enjoy nature. The beach was clean but a bit crowded during peak hours. Restaurants nearby offer excellent seafood.'),
    (2, 'MountainLover', 5, 'The views are absolutely breathtaking. Hiking trails are well maintained and offer various difficulty levels. Will definitely return!'),
    (3, 'SunsetChaser', 5, 'The sunset view from Oia is unmatched anywhere in the world. The white and blue architecture against the Aegean Sea is simply magical.'),
    (3, 'IslandHopper', 4, 'Beautiful scenery and charming villages. Be prepared for crowds and higher prices during summer. Spring is the best time to visit.'),
    (4, 'NatureFanatic', 5, 'Words and photos cannot describe the majesty of this place. You have to see it in person. Sunrise at the South Rim is unforgettable.'),
    (5, 'ZenSeeker', 5, 'The perfect place to find inner peace. The careful attention to detail in these gardens teaches you to appreciate the small things in life.'),
    (6, 'HistoryBuff', 5, 'Incredible archaeological site with rich history. The journey there is part of the adventure. Hire a guide to get the most out of your visit.'),
    (7, 'NightSkyWatcher', 4, 'Witnessed the aurora for the first time and it was magical. You need patience and luck with weather, but its worth the wait.'),
    (8, 'MarineExplorer', 5, 'Snorkeling here was the highlight of my life! The diversity of marine life is astounding. The coral colors are vibrant and beautiful.');

-- Create an index for faster place retrieval by views
CREATE INDEX idx_places_views ON places(views DESC);

-- Create an index for faster review retrieval by place_id
CREATE INDEX idx_reviews_place_id ON reviews(place_id);