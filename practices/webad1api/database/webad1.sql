-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 07, 2023 at 01:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webad1`
--

-- --------------------------------------------------------

--
-- Table structure for table `Category_Type`
--

CREATE TABLE `Category_Type` (
  `categoryType` varchar(20) NOT NULL,
  `typeName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Category_Type`
--

INSERT INTO `Category_Type` (`categoryType`, `typeName`) VALUES
('Cuisine', 'Asian'),
('Cuisine', 'Chinese'),
('Cuisine', 'Halal'),
('Cuisine', 'Indian'),
('Cuisine', 'Italian'),
('Cuisine', 'Japanese'),
('Cuisine', 'Korean'),
('Cuisine', 'Malay'),
('Cuisine', 'Singapore Local Delight'),
('Cuisine', 'Thai'),
('Cuisine', 'Vietnamese'),
('Cuisine', 'Western'),
('Type', 'Bakery'),
('Type', 'Bar/ Bistro'),
('Type', 'Cafés'),
('Type', 'Cafeteria '),
('Type', 'Casual'),
('Type', 'Coffeeshop'),
('Type', 'Dessert'),
('Type', 'Fast Food'),
('Type', 'Fine Dining'),
('Type', 'Food Court'),
('Type', 'Hawker'),
('Type', 'Restaurant'),
('Type', 'Snacks & Specialties');

-- --------------------------------------------------------

--
-- Table structure for table `Opening_Hours`
--

CREATE TABLE `Opening_Hours` (
  `openhrsId` int(5) NOT NULL,
  `restaurantId` int(5) NOT NULL,
  `dayOfWeek` varchar(20) NOT NULL,
  `valueText` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Opening_Hours`
--

INSERT INTO `Opening_Hours` (`openhrsId`, `restaurantId`, `dayOfWeek`, `valueText`) VALUES
(1, 2, 'Daily', '5:00 PM - 10:00 PM'),
(2, 3, 'Daily', '12:00 PM - 4:00 PM,5:30 PM - 9:30 PM'),
(3, 4, 'Daily', '12:00 PM - 2:30 PM, 6:15 PM - 10:15 PM'),
(4, 5, 'Daily', '10:30 AM - 06:00 AM'),
(5, 6, 'Daily', '08:00 AM - 10:00 PM'),
(6, 7, 'Daily', '09:00 AM - 10:30 PM'),
(7, 8, 'Daily', '6:00 PM - 12:00 AM'),
(8, 10, 'Daily', '11:30 AM - 9:30 PM'),
(9, 11, 'Daily', '09:00 AM - 10:00 PM');

-- --------------------------------------------------------

--
-- Table structure for table `Promotions`
--

CREATE TABLE `Promotions` (
  `promoId` int(5) NOT NULL,
  `restaurantId` int(5) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Promotions`
--

INSERT INTO `Promotions` (`promoId`, `restaurantId`, `title`, `description`, `startDate`, `endDate`) VALUES
(1, 4, '1-for-1 Omizu lunch buffet', NULL, '2023-01-01', '2023-12-31'),
(2, 5, '20% off meat and vegetable dishes after 10pm.', '', '2023-08-08', '2023-12-30');

-- --------------------------------------------------------

--
-- Table structure for table `Restaurants`
--

CREATE TABLE `Restaurants` (
  `restaurantId` int(5) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `add1` varchar(100) DEFAULT NULL,
  `add2` varchar(100) DEFAULT NULL,
  `add3` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT 'Singapore',
  `postalCode` varchar(20) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `status` varchar(10) DEFAULT 'draft'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Restaurants`
--

INSERT INTO `Restaurants` (`restaurantId`, `name`, `description`, `website`, `contact`, `add1`, `add2`, `add3`, `city`, `country`, `postalCode`, `area`, `status`) VALUES
(2, 'Cut by Wolfgang Puck', 'CUT by Wolfgang Puck’s first Asian outpost can be found at Marina Bay Sands Singapore. The critically acclaimed steak restaurant features a comfortably modern dining room designed by esteemed hospitality designer Tony Chi. The menu presents a contemporary twist on the classic steak restaurant, featuring the world’s finest meats, poultry, and seafood, all complemented by house-made sauces and delectable sides. An extensive international wine list offers more than 500 outstanding selections. CUT is proud to have received a One Star rating in Singapore’s first edition of the Michelin Guide, in 2016.', 'https://wolfgangpuck.com/dining/cut-singapore/', '+65 6688 8517', '2 Bayfront Ave,', 'B1 - 71', 'Singapore 018972', NULL, 'Singapore', '018972', 'Marina Bay', 'draft'),
(3, 'DB Bistro & Oyster Bar', 'DB Bistro & Oyster Bar offers an exciting mix of traditional French bistro cooking with contemporary American flavors, and a world-renown collection of signature burgers. Chef Daniel Boulud reinterprets the classic Parisian bistro while sharing the energy and style of his acclaimed db Bistro Moderne in Midtown Manhattan. In addition to the slew of Parisan bistro favourites and New York-style burgers that have found pride of place on the menu, the revamped menu brings with it plenty from the sea. Expect to find freshly shucked French and American oysters alongside Maine', 'https://www.dbbistro.com/singapore/', '+65 9456 8097', '2 Bayfront Avenue', 'B1-48, Galleria Level The Shoppes at Marina Bay Sands', 'Singapore 018958', NULL, 'Singapore', '018958', 'Marina Bay', 'draft'),
(4, 'Shin Minori Japanese Restaurant (UE Square)', 'Shin Minori is all about value in Japanese dining. Offering all sorts of cravings from sushi to tempura, this is your one stop shop for Japanese feasting without the splurge. Best known for its a la carte buffet option, Shin Minori is the UE Square eatery that\'s ideal for group gatherings or family dinners, where a variety of palates need to be pleased. Meaning \'new harvest\' in Japanese, the restaurant features a motif of golden grains blended with traditional Japanese design for a casual yet distinguished atmosphere. The menu indeed showcases the new and noteworthy, with novel selections crafted by the kitchen team to enhance the buffet experience with original tastes.', 'https://www.shinminori.com.sg/', '+65 6733 2272', '81 Clemenceau Avenue', 'UE Square 03-15/16 UE Sq', 'Singapore 239917', NULL, 'Singapore', '239917', 'Central Area/City Area', 'draft'),
(5, 'Haidilao Hot Pot', 'Worldwide popular Sichuan style Hot Pot, gathering various regional influences and tastes along the way. Watch the chefs knead their homemade noodles right at your booths and taste the freshness of the succulent noodles that\'s perfect with the hearty spice-infused broth. Enjoy complimentary drinks and snacks while waiting for a table.', 'http://www.haidilao.com/sg/', '+65 6835 7337', '313 Orchard Road', '313 @ Somerset Somerset #04-23/24', 'Singapore 238895', NULL, 'Singapore', '238895', 'Somerset', 'draft'),
(6, '4 Fingers Crispy Chicken', 'Crispy and saucy 4Fingers fried chicken. Hand brushed to perfection with our unique Soy Garlic or Spicy Hot sauce that leave you wanting for more.', 'https://www.4fingers.com.sg/', '+65 6835 7337', '2 Orchard Turn', '#B4-06A', 'Singapore 238801', NULL, 'Singapore', '238801', 'Orchard', 'draft'),
(7, 'Yum Cha Restaurant', 'Yum Cha Restaurant first opened its doors in the heart of Chinatown. Yum Cha first started out in 2000 near Temple Street, Chinatown, with the aim of bringing back the dim sum tea house concept in a shophouse setting, with marble tables and wooden chairs for a nostalgic feel. Away from the hustle and bustle of city life, Yum Cha Restaurants offer a unique dim sum dining experience – be it for lunch or dinner.', 'https://www.yumcha.com.sg/', '+65 6372 1717', '20 Trengganu Street', '#02-01', 'Singapore 058479', NULL, 'Singapore', '058479', 'Outram', 'draft'),
(8, 'NOX - Dine In The Dark', 'At NOX – Dine In The Dark, we invite you to plunge into an intriguing new world of mystery and sensation you have never experienced before, and join us on a culinary journey through taste, smell, touch and sound, in total darkness. Seated in our pitch-black dining room, you will be guided and served by blind or visually impaired individuals that have been specially trained to offer guidance and reassurance to sighted guests. It is truly a rich human experience when the roles are reversed and the blind become your eyes, opening your mind to a deeper consciousness. Also, discover our exquisite menu crafted from the finest ingredients by our Chef de Cuisine and his team, and enjoy our fine wine selection and unique signature cocktails customized for each individual\'s palate. NOX - Dine in the Dark is definitely more than just dining, it is a unique mind-altering sensory experience! Experience this new European dining trend first-hand and \'see\' it for yourself!', 'http://www.noxdineinthedark.com/', '+65 6298 0708', '83 Club Street', 'Singapore 069451', '', NULL, 'Singapore', '069451', 'Central Area/City Area', 'draft'),
(10, 'Positano Risto', 'Singapore\'s only halal Italian restaurant in the Arab Street area. Amazing Italian, Without Alcohol! Relaxed indoor-outdoor restaurant with alcohol-free drinks & hearty plates of halal Italian cuisine.', 'https://positanoristo.com/', '+65 6292 1866', '66 Bussorah Street', 'Singapore 199479', '', NULL, 'Singapore', '199479', 'Rochor', 'active'),
(11, 'My Awesome Cafe', 'Singapore\'s 1st TCM Hospital transformed into #1 Cafe. Open 365 days a year, with a menu offered all day long from opening to closing, we are a very cool Family (our team is our family indeed) and cosy cafe / bistro / bar that serves breakfast, lunch, snacks, dinner and late dinner. We took over the very first Traditional Chinese Medicine Hospital dated 1952 and converted it into a chill-out place that bakes its own bread, becomes a bistro at lunchtime and transforms into a bar / bistro in the evening. We offer salads, sandwiches, burgers, wraps, hot main courses, desserts, protein shakes for the sporty guys, an acai menu for those in need of the purest available, platters to share.', 'http://www.myawesomecafe.com/', '+65 8798 1783', '202 Telok Ayer Street', 'Singapore 068639', '', NULL, 'Singapore', '068639', 'Central Area/City Area', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `Restaurant_Category_Type`
--

CREATE TABLE `Restaurant_Category_Type` (
  `restaurantId` int(5) NOT NULL,
  `categoryType` varchar(20) DEFAULT NULL,
  `typeName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Restaurant_Category_Type`
--

INSERT INTO `Restaurant_Category_Type` (`restaurantId`, `categoryType`, `typeName`) VALUES
(2, 'Type', 'Bar/ Bistro'),
(2, 'Type', 'Fine Dining'),
(2, 'Cuisine', 'Western'),
(3, 'Type', 'Bar/ Bistro'),
(3, 'Type', 'Fine Dining'),
(3, 'Cuisine', 'Western'),
(4, 'Type', 'Restaurant'),
(4, 'Cuisine', 'Asian'),
(4, 'Cuisine', 'Japanese'),
(5, 'Type', 'Restaurant'),
(5, 'Cuisine', 'Asian'),
(5, 'Cuisine', 'Chinese'),
(6, 'Type', 'Fast Food'),
(6, 'Type', 'Casual'),
(6, 'Cuisine', 'Asian'),
(6, 'Cuisine', 'Korean'),
(6, 'Cuisine', 'Halal'),
(7, 'Type', 'Casual'),
(7, 'Type', 'Restaurant'),
(7, 'Cuisine', 'Asian'),
(7, 'Cuisine', 'Chinese'),
(8, 'Type', 'Fine Dining'),
(8, 'Type', 'Restaurant'),
(8, 'Cuisine', 'Western'),
(10, 'Type', 'Restaurant'),
(10, 'Cuisine', 'Italian'),
(10, 'Cuisine', 'Halal'),
(11, 'Type', 'Bar/ Bistro'),
(11, 'Type', 'Cafés'),
(11, 'Type', 'Casual'),
(11, 'Cuisine', 'Asian');

-- --------------------------------------------------------

--
-- Table structure for table `Restaurant_Photo`
--

CREATE TABLE `Restaurant_Photo` (
  `photoId` int(5) NOT NULL,
  `restaurantId` int(5) NOT NULL,
  `reviewId` int(5) DEFAULT NULL,
  `photoUrl` text NOT NULL,
  `defaultPhoto` tinyint(1) NOT NULL DEFAULT 0,
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `addedBy` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Restaurant_Photo`
--

INSERT INTO `Restaurant_Photo` (`photoId`, `restaurantId`, `reviewId`, `photoUrl`, `defaultPhoto`, `createdOn`, `addedBy`) VALUES
(1, 2, NULL, 'https://wolfgangpuck.com/wp-content/uploads/2021/01/Wolfgang-Puck-logo-e1591101116815.jpg', 1, '2023-06-04 11:48:41', NULL),
(2, 3, NULL, 'https://pbs.twimg.com/profile_images/966772532027297795/y3YzdTf9_400x400.jpg', 1, '2023-06-04 12:03:18', NULL),
(3, 4, NULL, 'https://s3-ap-southeast-1.amazonaws.com/v3-live.image.oddle.me/logo/menu_logo_ShinMinoriJapaneseRestaurantae3cc9.jpg', 1, '2023-06-04 13:26:16', NULL),
(4, 5, NULL, 'https://www.capitaland.com/content/dam/capitaland-sites/singapore/shop/malls/bugis-plus/tenants/BP_HDL_logo1.jpg.transform/cap-midres/image.jpg', 1, '2023-06-04 13:45:40', NULL),
(5, 6, NULL, 'https://www.capitaland.com/content/dam/capitaland-tenants/imported/en/-/media/cma-malls/websites/logos_560/other/4%20fingers%20crispy%20chicken_4fingers-logo_3fb33a6f-bfba-46e5-957d-576601d6fdc7_560x462.jpg.transform/cap-lowres/image.jpg', 1, '2023-06-04 13:53:13', NULL),
(6, 7, NULL, 'https://3.bp.blogspot.com/-PHl90Mb8Z1w/UxnvjM1_pTI/AAAAAAAAIaw/KseseM0n8is/s1600/Yum+Cha+Logo.jpg', 1, '2023-06-04 14:17:05', NULL),
(7, 8, NULL, 'https://whatstheplanb.files.wordpress.com/2021/05/nox_logo_social.jpeg', 1, '2023-06-04 15:10:06', NULL),
(8, 10, NULL, 'https://www.bestinsingapore.co/wp-content/uploads/2023/05/Positano-Risto.jpg', 1, '2023-06-04 15:26:28', NULL),
(9, 10, NULL, 'https://1.bp.blogspot.com/-OXVlvj6XCnM/XXjA9a-0G-I/AAAAAAAAYE0/Jlj833pzpwYoN8jRTA_cAjnrZlFTIwe0gCLcBGAsYHQ/s1600/Positano-2.jpg', 0, '2023-06-04 15:26:28', NULL),
(10, 10, NULL, 'https://media-cdn.tripadvisor.com/media/photo-s/19/07/ea/a3/signature-whole-boston.jpg', 0, '2023-06-04 15:26:28', NULL),
(11, 11, NULL, 'https://images.squarespace-cdn.com/content/v1/57222aa87c65e4e273671ded/1462457775188-75PWAA3CH8IY86GRI7VN/image-asset.png', 1, '2023-06-04 15:57:54', NULL),
(12, 11, NULL, 'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2020/10/telok-ayer-guide-My-Awesome-Cafe-via-Facebook.jpg', 0, '2023-06-04 15:57:54', NULL),
(13, 11, NULL, 'https://images.squarespace-cdn.com/content/v1/57222aa87c65e4e273671ded/1462208405615-J9OVCBVG6C84ZIF8L1FK/My+Awesome+Cafe+-+18.jpg', 0, '2023-06-04 15:57:54', NULL),
(14, 11, NULL, 'https://4.bp.blogspot.com/-FAWEf-if7Vs/UzpwVJzx83I/AAAAAAAAIhk/uzuzN6Xzfxw/s1600/4.jpg', 0, '2023-06-04 15:57:54', NULL),
(15, 11, 1, 'https://burpple-2.imgix.net/foods/62aeb498bfb07f5a4141920744_original.?w=400&h=400&fit=crop&q=80&auto=format', 0, '2023-06-04 17:26:35', 1),
(16, 11, 1, 'https://eatbook.sg/wp-content/uploads/2019/03/telok-ayer-cafes-my-awesome-cafe-food.jpg', 0, '2023-06-04 17:26:35', 1),
(17, 11, 1, 'https://hungryghost.sg/wp-content/uploads/2021/06/My-Awesome-Cafe-Menu-4.jpg', 0, '2023-06-04 17:26:35', 1),
(18, 3, 5, 'https://media-cdn.tripadvisor.com/media/photo-s/1b/3a/9b/9d/photo2jpg.jpg', 0, '2023-06-04 17:47:09', 1),
(19, 3, 5, 'https://shopsinsg.com/wp-content/uploads/2020/05/db-bistro-oyster-bar-by-daniel-boulud.jpg', 0, '2023-06-04 17:47:09', 1),
(20, 3, 6, 'https://media-cdn.tripadvisor.com/media/photo-s/12/8c/44/ff/photo1jpg.jpg', 0, '2023-06-04 17:53:04', 4),
(21, 3, 6, 'https://media-cdn.tripadvisor.com/media/photo-s/10/b8/84/0f/steak-with-add-on-of.jpg', 0, '2023-06-04 17:53:04', 4),
(22, 2, 7, 'https://burpple-3.imgix.net/foods/1669736948_review_image1956136_original.?w=420&dpr=1&fit=crop&q=80&auto=format', 0, '2023-06-04 17:57:58', 4),
(23, 2, 7, 'https://1.bp.blogspot.com/-jJlZAV_j8ZI/VhxlenmXObI/AAAAAAAASJc/6HghoF3jFvo/s1600/16.JPG', 0, '2023-06-04 17:57:58', 4),
(24, 2, 7, 'https://i.ytimg.com/vi/t7YfvW-jLuU/maxresdefault.jpg', 0, '2023-06-04 17:57:58', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Restaurant_Review`
--

CREATE TABLE `Restaurant_Review` (
  `reviewId` int(5) NOT NULL,
  `restaurantId` int(5) NOT NULL,
  `userId` int(5) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `comment` text NOT NULL,
  `rating` decimal(2,1) NOT NULL,
  `status` varchar(10) DEFAULT 'draft',
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Restaurant_Review`
--

INSERT INTO `Restaurant_Review` (`reviewId`, `restaurantId`, `userId`, `title`, `comment`, `rating`, `status`, `createdOn`) VALUES
(1, 11, 1, 'Love this cafe!', 'Fabulous restaurant and wonderful experience celebrating a family birthday. Extra special and perfect ambiance. Gluten free and vegan options.', 5.0, 'draft', '2023-06-04 17:26:35'),
(2, 7, 4, 'Yum Cha!', 'Yum Cha! Wow everything I was hoping for and more. Extensive menu of dim sums, soups and other dishes. All very flavorful. You review the menu and select your items via an easy app and keep placing orders immediately when you want more. I enjoyed the Crystal Chives dumpling, prawn wonton fried dumpling, hot & spicy seafood soup, and salt& pepper sotong (cuttlefish). It was all delicious, maybe the soup was my fav but all were delicious. For sure will return!', 4.5, 'draft', '2023-06-04 17:35:35'),
(3, 7, 7, 'Authentic Cantonese cuisine', 'Love this place! I’m Cantonese and the taste of the dim sum here is authentic and yummy. Staffs are friendly and diligent. Price is a bit high but once a while is fine.', 4.5, 'draft', '2023-06-04 17:38:00'),
(4, 3, 8, 'Fantastic dinner', 'Dinner was fantastic! The food was great, the drinks were great - the wine was perfect, the only thing missing was a Williams Pear as digestif - and the service was super, thanks to the sommelier and the waiter Kumar. The atmosphere in the restaurant is relaxed, nice interior and guests. Will definitively come back!', 5.0, 'draft', '2023-06-04 17:41:40'),
(5, 3, 1, 'Great food and exceptional service', 'Just a fantastic dinner in terms of service and food. We had been traveling throughout Asia for 12 days, and had our fair share of Asian food which we love, so thought we\'d try something different. I\'m a bit skeptical about TV chef restaurants but all our dishes were fantastic and the service was the best we\'ve experienced anywhere in a restaurant in the last few years thanks to Joanna and Johnny, just exceptional.', 4.5, 'draft', '2023-06-04 17:47:09'),
(6, 3, 4, 'A good lunch experience', 'It was a good lunch experience, and we will return again to try out the other menus. The staff attending to us Sachin, was very polite and friendly. He kept us informed of when and what to expect of our next item on the menu. It was our anniversary and the restaurant gave us a complimentary dessert which was very kind of them', 4.0, 'active', '2023-06-04 17:53:04'),
(7, 2, 4, 'Superb!', 'What can I say? It was an absolutely fabulous Easter dinner! Everything was wonderful, starting from the buzzy, bustling restaurant and its chic decor of giant celeb portraits, right down to the exquisite dishes as well as the seamless, impeccable yet friendly service. The staff seemed to work in synergy, giving us the impression that they were always within earshot, on hand to help with requests and recommendations at every turn, and with ready smiles. Every dish was divine. We had a couple of beautifully plated tuna tartare and lobster starters. Each bite revealed a delightfully delicate explosion of flavours. For the main, we had the “Wagyu Tasting from America, Australia & Japan”. It was recommended that we start with the largest Aussie cut, followed by the medium sized American, and then, the smallest and most expensive Japanese cut. The Aussie cut was surprisingly so flavourful that the American cut kind of paled in comparison, But needless to say, the star of the show was the tender Japanese Wagyu, with its incredible marbling. Seriously, this tasting platter celebrates beef! We were stuffed pretty soon but I still managed to tuck into a peanut chocolate bar of a dessert. (Decadently yummy!) They say “a picture is worth a thousand words”. Well, I’ll leave you with some photos (but excuse me if my photography doesn’t do it justice!)', 5.0, 'active', '2023-06-04 17:57:58');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `userId` int(5) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(30) NOT NULL DEFAULT 'user',
  `createdOn` timestamp NOT NULL DEFAULT current_timestamp(),
  `profilePhoto` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`userId`, `username`, `email`, `password`, `role`, `createdOn`, `profilePhoto`) VALUES
(1, 'Michael J Mark', 'aletha_hauc4@gmail.com', 'Hu8aph1ohth', 'user', '2023-06-03 15:10:03', NULL),
(2, 'yippee', 'yippee@gmail.com', 'yippee', 'admin', '2023-06-03 15:10:42', NULL),
(3, 'Kim P Go', 'kimpgo@hotmail.com', 'choXee0j', 'user', '2023-06-03 15:57:43', NULL),
(4, 'Jennifer Morrison', 'jennifer@hotmail.com', 'ohNied3oh', 'user', '2023-06-03 16:00:41', NULL),
(5, 'Kevin M Kel', 'kevin@gmail.com', 'eiMo6Eekah', 'user', '2023-06-03 16:01:32', NULL),
(6, 'Esther E Emery', 'esther@hotmail.com', 'citlalli', 'user', '2023-06-03 16:03:23', NULL),
(7, 'Yann Min', 'yann@gmail.com', 'yanmm8899', 'user', '2023-06-03 16:05:38', NULL),
(8, 'Richard T Lopez', 'lesly1995@gmail.com', 'Theesahnai3', 'user', '2023-06-03 16:06:46', NULL),
(9, 'Evelyn S Boyer', 'evelyn@gmail.com', 'eboyer963', 'user', '2023-06-06 13:56:11', NULL),
(10, 'Edward M Steiner', 'edwardms@gmail.com', 'sagittarius', 'user', '2023-06-06 13:58:09', NULL),
(11, 'Pamela Hsu', 'pamelahsu@gmail.com', 'ughoa7eToh', 'user', '2023-06-06 13:59:57', NULL),
(12, 'HildaMel', 'hildamel@gmail.com', 'HildaMel', 'user', '2023-06-06 14:00:46', NULL),
(13, 'Anthony Lew', 'lew1995@gmail.com', 'antlew95', 'user', '2023-06-06 14:01:36', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category_Type`
--
ALTER TABLE `Category_Type`
  ADD PRIMARY KEY (`categoryType`,`typeName`);

--
-- Indexes for table `Opening_Hours`
--
ALTER TABLE `Opening_Hours`
  ADD PRIMARY KEY (`openhrsId`),
  ADD KEY `FK_restaurant_openhrs` (`restaurantId`);

--
-- Indexes for table `Promotions`
--
ALTER TABLE `Promotions`
  ADD PRIMARY KEY (`promoId`),
  ADD KEY `FK_restaurant_promo` (`restaurantId`);

--
-- Indexes for table `Restaurants`
--
ALTER TABLE `Restaurants`
  ADD PRIMARY KEY (`restaurantId`);

--
-- Indexes for table `Restaurant_Category_Type`
--
ALTER TABLE `Restaurant_Category_Type`
  ADD KEY `FK_category_type` (`categoryType`,`typeName`),
  ADD KEY `FK_restaurant_category_type` (`restaurantId`);

--
-- Indexes for table `Restaurant_Photo`
--
ALTER TABLE `Restaurant_Photo`
  ADD PRIMARY KEY (`photoId`),
  ADD KEY `FK_restaurant_photo` (`restaurantId`),
  ADD KEY `FK_review_photo` (`reviewId`),
  ADD KEY `FK_user_photo` (`addedBy`);

--
-- Indexes for table `Restaurant_Review`
--
ALTER TABLE `Restaurant_Review`
  ADD PRIMARY KEY (`reviewId`),
  ADD KEY `FK_restaurant_review` (`restaurantId`),
  ADD KEY `FK_user_review` (`userId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Opening_Hours`
--
ALTER TABLE `Opening_Hours`
  MODIFY `openhrsId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Promotions`
--
ALTER TABLE `Promotions`
  MODIFY `promoId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Restaurants`
--
ALTER TABLE `Restaurants`
  MODIFY `restaurantId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Restaurant_Photo`
--
ALTER TABLE `Restaurant_Photo`
  MODIFY `photoId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Restaurant_Review`
--
ALTER TABLE `Restaurant_Review`
  MODIFY `reviewId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `userId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Opening_Hours`
--
ALTER TABLE `Opening_Hours`
  ADD CONSTRAINT `FK_restaurant_openhrs` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants` (`restaurantId`);

--
-- Constraints for table `Promotions`
--
ALTER TABLE `Promotions`
  ADD CONSTRAINT `FK_restaurant_promo` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants` (`restaurantId`);

--
-- Constraints for table `Restaurant_Category_Type`
--
ALTER TABLE `Restaurant_Category_Type`
  ADD CONSTRAINT `FK_category_type` FOREIGN KEY (`categoryType`,`typeName`) REFERENCES `Category_Type` (`categoryType`, `typeName`),
  ADD CONSTRAINT `FK_restaurant_category_type` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants` (`restaurantId`);

--
-- Constraints for table `Restaurant_Photo`
--
ALTER TABLE `Restaurant_Photo`
  ADD CONSTRAINT `FK_restaurant_photo` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants` (`restaurantId`),
  ADD CONSTRAINT `FK_review_photo` FOREIGN KEY (`reviewId`) REFERENCES `Restaurant_Review` (`reviewId`),
  ADD CONSTRAINT `FK_user_photo` FOREIGN KEY (`addedBy`) REFERENCES `Users` (`userId`);

--
-- Constraints for table `Restaurant_Review`
--
ALTER TABLE `Restaurant_Review`
  ADD CONSTRAINT `FK_restaurant_review` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurants` (`restaurantId`),
  ADD CONSTRAINT `FK_user_review` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
