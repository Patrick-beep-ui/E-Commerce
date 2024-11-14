-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-12-2023 a las 21:57:52
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `city` varchar(255) NOT NULL,
  `shipping` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Sofa', NULL, NULL),
(2, 'Chair', NULL, NULL),
(3, 'Living', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_11_24_220154_create_addresses_table', 1),
(6, '2023_11_24_220846_create_categories_table', 1),
(7, '2023_11_24_220947_create_products_table', 1),
(8, '2023_11_24_221526_create_whishlist_table', 1),
(9, '2023_11_24_222135_create_orders_table', 1),
(10, '2023_11_24_222924_create_order_items_table', 1),
(11, '2023_11_27_182153_add_colors_column_to_products_table', 2),
(12, '2023_11_27_182723_create_product_variations_table', 3),
(13, '2023_12_01_185316_modify_colors_column_at_products_table', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` enum('checkout','completed','canceled') NOT NULL DEFAULT 'checkout',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(6, 215, 'checkout', '2023-12-02 00:56:35', '2023-12-02 00:56:35'),
(7, 215, 'checkout', '2023-12-02 00:59:16', '2023-12-02 00:59:16'),
(8, 215, 'checkout', '2023-12-02 01:00:47', '2023-12-02 01:00:47'),
(9, 201, 'checkout', '2023-12-07 02:16:48', '2023-12-07 02:16:48'),
(10, 219, 'checkout', '2023-12-07 02:26:26', '2023-12-07 02:26:26'),
(11, 219, 'checkout', '2023-12-07 02:26:56', '2023-12-07 02:26:56'),
(12, 201, 'checkout', '2023-12-07 07:16:32', '2023-12-07 07:16:32'),
(13, 20, 'checkout', '2023-12-07 10:59:25', '2023-12-07 10:59:25'),
(14, 20, 'checkout', '2023-12-07 12:44:15', '2023-12-07 12:44:15'),
(15, 2, 'checkout', '2023-12-07 14:07:36', '2023-12-07 14:07:36'),
(16, 2, 'checkout', '2023-12-07 14:07:53', '2023-12-07 14:07:53'),
(17, 2, 'checkout', '2023-12-08 04:13:33', '2023-12-08 04:13:33'),
(18, 2, 'checkout', '2023-12-08 04:14:18', '2023-12-08 04:14:18'),
(19, 2, 'checkout', '2023-12-08 04:23:01', '2023-12-08 04:23:01'),
(20, 221, 'checkout', '2023-12-11 10:48:43', '2023-12-11 10:48:43'),
(21, 221, 'checkout', '2023-12-11 10:49:04', '2023-12-11 10:49:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`id`, `quantity`, `price`, `order_id`, `product_id`, `created_at`, `updated_at`) VALUES
(2, 2, 2399.00, 6, 7, '2023-12-02 00:56:35', '2023-12-02 00:56:35'),
(3, 2, 1500.00, 6, 9, '2023-12-02 00:56:35', '2023-12-02 00:56:35'),
(4, 1, 700.00, 6, 14, '2023-12-02 00:56:35', '2023-12-02 00:56:35'),
(5, 1, 2399.00, 7, 7, '2023-12-02 00:59:16', '2023-12-02 00:59:16'),
(6, 1, 1500.00, 7, 9, '2023-12-02 00:59:16', '2023-12-02 00:59:16'),
(7, 1, 850.00, 8, 16, '2023-12-02 01:00:47', '2023-12-02 01:00:47'),
(8, 1, 300.00, 8, 31, '2023-12-02 01:00:47', '2023-12-02 01:00:47'),
(9, 1, 699.00, 8, 33, '2023-12-02 01:00:47', '2023-12-02 01:00:47'),
(10, 1, 1999.00, 9, 6, '2023-12-07 02:16:48', '2023-12-07 02:16:48'),
(11, 1, 2399.00, 9, 7, '2023-12-07 02:16:48', '2023-12-07 02:16:48'),
(12, 1, 1999.00, 10, 6, '2023-12-07 02:26:26', '2023-12-07 02:26:26'),
(13, 1, 1600.00, 10, 10, '2023-12-07 02:26:26', '2023-12-07 02:26:26'),
(14, 1, 700.00, 10, 14, '2023-12-07 02:26:26', '2023-12-07 02:26:26'),
(15, 1, 300.00, 11, 31, '2023-12-07 02:26:56', '2023-12-07 02:26:56'),
(16, 1, 700.00, 12, 14, '2023-12-07 07:16:32', '2023-12-07 07:16:32'),
(17, 1, 870.00, 12, 13, '2023-12-07 07:16:32', '2023-12-07 07:16:32'),
(18, 1, 850.00, 12, 16, '2023-12-07 07:16:32', '2023-12-07 07:16:32'),
(19, 1, 1500.00, 13, 9, '2023-12-07 10:59:25', '2023-12-07 10:59:25'),
(20, 1, 870.00, 13, 13, '2023-12-07 10:59:25', '2023-12-07 10:59:25'),
(21, 1, 300.00, 13, 31, '2023-12-07 10:59:25', '2023-12-07 10:59:25'),
(22, 1, 2399.00, 14, 7, '2023-12-07 12:44:15', '2023-12-07 12:44:15'),
(23, 1, 1500.00, 15, 9, '2023-12-07 14:07:36', '2023-12-07 14:07:36'),
(24, 1, 1600.00, 15, 10, '2023-12-07 14:07:36', '2023-12-07 14:07:36'),
(25, 1, 870.00, 16, 13, '2023-12-07 14:07:53', '2023-12-07 14:07:53'),
(26, 1, 700.00, 16, 14, '2023-12-07 14:07:53', '2023-12-07 14:07:53'),
(27, 1, 300.00, 16, 31, '2023-12-07 14:07:54', '2023-12-07 14:07:54'),
(28, 2, 1500.00, 17, 9, '2023-12-08 04:13:33', '2023-12-08 04:13:33'),
(29, 1, 870.00, 17, 13, '2023-12-08 04:13:33', '2023-12-08 04:13:33'),
(30, 1, 850.00, 17, 16, '2023-12-08 04:13:33', '2023-12-08 04:13:33'),
(31, 1, 1999.00, 18, 6, '2023-12-08 04:14:18', '2023-12-08 04:14:18'),
(32, 1, 1600.00, 20, 10, '2023-12-11 10:48:43', '2023-12-11 10:48:43'),
(33, 1, 1999.00, 21, 6, '2023-12-11 10:49:04', '2023-12-11 10:49:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 212, 'Lenovo Laptop', '497469e8dde90831305b77067f2a405d9c4733ba5ad838cae4affda1725f5176', '[\"*\"]', NULL, NULL, '2023-11-29 09:44:59', '2023-11-29 09:44:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL DEFAULT 'default_path.jpg',
  `stock` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `price` decimal(10,2) UNSIGNED NOT NULL DEFAULT 0.00,
  `colors` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `path`, `stock`, `price`, `colors`, `category_id`, `created_at`, `updated_at`) VALUES
(6, 'Buchanan Roll', 'Roll arm.\r\nRemovable legs feature an Espresso finish.\r\nAdjustable levelers provide stability on uneven floors.\r\nLoose cushions.\r\nPolyester-wrapped cushions for a firmer feel.\r\nNo-sag steel sinuous springs provide cushion support.\r\nCorner-blocked frame pro', '/img/Sofas/Buchanan Roll/Buchanan Roll Camel', 46, 1999.00, '#CDB89B', 1, '2023-11-26 06:16:38', '2023-12-11 10:49:04'),
(7, 'Cameron Roll', 'A mix between modern and english styles. It\'s clean and simple lines, detachable back cushions and hardwood legs reference modernism, whereas, its rolled arms adhere to English design. The seat cushion and back cushion covers can be removed for easy clean', '/img/Sofas/Cameron Roll/Cameron Roll Arm', 45, 2399.00, '#90938C', 1, '2023-11-26 06:16:38', '2023-12-07 12:44:15'),
(8, 'Canyon Square', 'Modern form meets classic comfort: The secret to our Canyon Collection is a low profile and oversized cushions that feel like you’re on cloud nine, and is designed for curling up with a book or watching your favorite show. You choose the arm style and fab', '/img/Sofas/Canyon Square/Canyon Square Light Gray', 50, 3000.00, '#CAC5C1', 1, '2023-11-26 06:16:38', '2023-11-26 06:16:38'),
(9, 'PB Comfort Roll', 'The PB Comfort Roll Arm Slipcovered Sofa is a classic and stylish sofa from Pottery Barn. The sofa features a roll arm design and removable round wood peg legs finished in a rich Espresso ¹. The cushions are loose and made of memory foam, which offers sin', '/img/Sofas/PB Comfort Roll/PB Comfort Roll Midnight', 43, 1500.00, '#4A515B', 1, '2023-11-26 06:16:39', '2023-12-08 04:13:33'),
(10, 'York Slope', 'The York Slope Arm Deep Seat Slipcovered Sofa is a comfortable and stylish sofa from Pottery Barn. It features a slope arm design and tapered, removable legs with an Espresso finish. The sofa comes with loose cushions, and you can choose from multi-seat c', '/img/Sofas/York Slope/York Slope Dijon', 47, 1600.00, '#906226', 1, '2023-11-26 06:16:39', '2023-12-11 10:48:43'),
(12, 'Ayden Square ', 'The Ayden Square Arm Leather Armchair is a comfortable and stylish piece of furniture that would be a great addition to any living space. It features square arms and fixed cylindrical legs crafted from solid rubberwood and finished in chocolate. The chair', '/img/Chairs/Ayden Square/Ayden Square Brown', 50, 640.00, '#7E6453', 2, '2023-11-26 06:16:39', '2023-11-26 06:16:39'),
(13, 'Balboa ', 'The Balboa Upholstered Swivel Armchair is a stylish and comfortable piece of furniture that would be a great addition to any living space. It features a barrel arm and a swivel mechanism that allows the chair to turn a full 360 degrees. The chair has loos', '/img/Chairs/Balboa/Balboa Navy 2', 46, 870.00, '#7D8695', 2, '2023-11-26 06:16:39', '2023-12-08 04:13:33'),
(14, 'Remmy', 'The Remmy Upholstered Swivel Armchair is a stylish and comfortable piece of furniture that would be a great addition to any living space. It features a barrel roll arm and a black metal swivel mechanism that turns 360°, but does not tilt. The chair has lo', '/img/Chairs/Remmy/Remmy Rosewood', 46, 700.00, '#CFA597', 2, '2023-11-26 06:16:39', '2023-12-07 14:07:53'),
(15, 'Tyler Square ', 'The Tyler Leather Square Arm Recliner Chair is a comfortable and stylish piece of furniture that would make a great addition to any living room. It features square arms and removable legs with an Espresso finish. The cushions are loose and down-blend wrap', '/img/Chairs/Tyler Square/Tyler Square Pebble 2', 50, 900.00, '#E6E1DE', 2, '2023-11-26 06:16:39', '2023-11-26 06:16:39'),
(16, 'Willem', 'The Willem Upholstered Armchair is a comfortable and stylish piece of furniture that can add a touch of elegance to any room. The chair has a slope arm design and removable rectangular solid ash wood legs that are finished in black2. The seat cushion is d', '/img/Chairs/Willem/Willem Dark Blue', 47, 850.00, '#1D212C', 2, '2023-11-26 06:16:39', '2023-12-08 04:13:33'),
(31, 'Allen Rectangular ', 'The Allen Rectangular Tiered End Table is a small-space solution that packs high-end style. It is designed with gorgeous teak wood and has multiple shelves to instantly up your surface-space game. The shelves are expertly crafted of sustainably sourced ma', '/img/Living/Allen Rectangular/Allen Rectangular Black', 46, 300.00, '#29211E', 3, '2023-11-26 06:16:39', '2023-12-07 14:07:54'),
(32, 'Benchwright Round', 'The Benchwright Round End Table is a beautiful piece of furniture that would make a great addition to any living room. It is expertly crafted of kiln-dried solid poplar and veneers, and is made of poplar, a medium-density hardwood that’s straight-grained ', '/img/Living/Benchwright Round/Benchwright Round Gray Wash', 50, 399.00, '#CCC0B2', 3, '2023-11-26 06:16:39', '2023-11-26 06:16:39'),
(33, 'Benchwright Square', 'The Benchwright Square End Table is a beautiful piece of furniture that would make a great addition to any living room. It is expertly crafted of kiln-dried solid poplar and veneers, and is made of poplar, a medium-density hardwood that’s straight-grained', '/img/Living/Benchwright Square/Benchwright Square Seadrift', 49, 699.00, '#B59B81', 3, '2023-11-26 06:16:39', '2023-12-02 01:00:47'),
(34, 'Malcom Square', 'The Malcolm Square Coffee Table is a beautiful piece of furniture that would be a great addition to any living space. It is masterfully crafted from solid spruce, spruce veneers and MDF. The legs of the table are made of metal with a powder-coated finish.', '/img/Living/Malcom Square/Malcom Square Glazed Pine', 50, 999.00, '#9A6E51', 3, '2023-11-26 06:16:39', '2023-11-26 06:16:39'),
(35, 'Reed Rectangular', 'The Reed Rectangular End Table is a beautiful piece of furniture that would make a great addition to any living room. It is expertly crafted of solid kiln-dried, sustainable mango wood and features a warm black or antique umber finish. The table has a spa', '/img/Living/Reed Rectangular/Reed Rectangular Warm Black', 50, 300.00, '#2B2C2B', 3, '2023-11-26 06:16:39', '2023-11-26 06:16:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_variations`
--

CREATE TABLE `product_variations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_variations`
--

INSERT INTO `product_variations` (`id`, `name`, `path`, `color`, `product_id`, `created_at`, `updated_at`) VALUES
(1, 'Buchanan Roll Camel', '/img/Sofas/Buchanan Roll/Buchanan Roll Camel', '#CDB89B', 6, NULL, NULL),
(2, 'Buchanan Roll Light Brown', '/img/Sofas/Buchanan Roll/Buchanan Roll Light Brown', '#5F4C3D', 6, NULL, NULL),
(3, 'Buchanan Roll Light Gray', '/img/Sofas/Buchanan Roll/Buchanan Roll Light Gray', '#CAC9C7', 6, NULL, NULL),
(4, 'Cameron Roll Gray', '/img/Sofas/Cameron Roll/Cameron Roll Arm', '#8B8E87', 7, NULL, NULL),
(5, 'Cameron Roll Adobe', '/img/Sofas/Cameron Roll/Cameron Roll Arm Adobe', '#BD9782', 7, NULL, NULL),
(6, 'Cameron Roll Ivory', '/img/Sofas/Cameron Roll/Cameron Roll Arm Ivory', '#C7C2BF', 7, NULL, NULL),
(7, 'Canyon Square Adobe', '/img/Sofas/Canyon Square/Canyon Square Adobe', '#BB9582', 8, NULL, NULL),
(8, 'Canyon Square Evergreen', '/img/Sofas/Canyon Square/Canyon Square Evergreen', '#464B35', 8, NULL, NULL),
(9, 'Canyon Square Light Gray', '/img/Sofas/Canyon Square/Canyon Square Light Gray', '#CBC8C3', 8, NULL, NULL),
(10, 'PB Comfort Roll Midnight', '/img/Sofas/PB Comfort Roll/PB Comfort Roll Midnight', '#383F49', 9, NULL, NULL),
(11, 'PB Comfort Roll Adobe', '/img/Sofas/PB Comfort Roll/PB Comfort Roll Adobe', '#AF826E', 9, NULL, NULL),
(12, 'PB Comfort Roll Ivory', '/img/Sofas/PB Comfort Roll/PB Comfort Roll Ivory', '#C1BDB9', 9, NULL, NULL),
(13, 'York Slope Dijon', '/img/Sofas/York Slope/York Slope Dijon', '#915F22', 10, NULL, NULL),
(14, 'York Slope Camel', '/img/Sofas/York Slope/York Slope Camel', '#BDA080', 10, NULL, NULL),
(15, 'York Slope Ink Blue', '/img/Sofas/York Slope/York Slope Ink Blue', '#17232F', 10, NULL, NULL),
(16, 'Ayden Square Brown', '/img/Chairs/Ayden Square/Ayden Square Brown', '#886E5D', 12, NULL, NULL),
(17, 'Ayden Square Camel', '/img/Chairs/Ayden Square/Ayden Square Camel', '#E1CDB4', 12, NULL, NULL),
(18, 'Ayden Square Ink Blue', '/img/Chairs/Ayden Square/Ayden Square Ink Blue', '#3A4D5E', 12, NULL, NULL),
(19, 'Ayden Square Rosewood', '/img/Chairs/Ayden Square/Ayden Square Rosewood', '#CDA292', 12, NULL, NULL),
(20, 'Ayden Square Spice', '/img/Chairs/Ayden Square/Ayden Square Spice', '#BD7046', 12, NULL, NULL),
(21, 'Balboa Navy ', '/img/Chairs/Balboa/Balboa Navy 2', '#4C525E', 13, NULL, NULL),
(22, 'Balboa Gray ', '/img/Chairs/Balboa/Balboa Gray 2', '#938D87', 13, NULL, NULL),
(23, 'Balboa Evergreen ', '/img/Chairs/Balboa/Balboa Evergreen 2', '#525340', 12, NULL, NULL),
(24, 'Remmy Rosewood', '/img/Chairs/Remmy/Remmy Rosewood', '#D0A698', 14, NULL, NULL),
(25, 'Remmy Ink Blue', '/img/Chairs/Remmy/Remmy Ink Blue', '#3B4E5F', 14, NULL, NULL),
(26, 'Remmy Light Gray', '/img/Chairs/Remmy/Remmy Light Gray', '#E3E0DB', 14, NULL, NULL),
(27, 'Remmy Light Green', '/img/Chairs/Remmy/Remmy Light Green', '#9A985D', 14, NULL, NULL),
(28, 'Remmy Stamping Blue', '/img/Chairs/Remmy/Remmy Stamping Blue', '#9598AE', 14, NULL, NULL),
(29, 'Tyler Square Pebble ', '/img/Chairs/Tyler Square/Tyler Square Pebble 2', '#E2DDD7', 15, NULL, NULL),
(30, 'Tyler Square Whiskey ', '/img/Chairs/Tyler Square/Tyler Square Whiskey 2', '#56312C', 15, NULL, NULL),
(31, 'Tyler Square Wolf Gray ', '/img/Chairs/Tyler Square/Tyler Square Wolf Gray 2', '#514132', 15, NULL, NULL),
(32, 'Willem Dark Blue', '/img/Chairs/Willem/Willem Dark Blue', '#1D212C', 16, NULL, NULL),
(33, 'Willem Adobe', '/img/Chairs/Willem/Willem Adobe', '#D3B09C', 16, NULL, NULL),
(34, 'Willem Warm White', '/img/Chairs/Willem/Willem Warm White', '#EFEEEA', 16, NULL, NULL),
(35, 'Allen Rectangular Black', '/img/Living/Allen Rectangular/Allen Rectangular Black', '#393736', 31, NULL, NULL),
(36, 'Allen Rectangular Brown', '/img/Living/Allen Rectangular/Allen Rectangular Brown', '#7A4D3A', 31, NULL, NULL),
(37, 'Benchwright Round Gray Wash', '/img/Living/Benchwright Round/Benchwright Round Gray Wash', '#CCC0B2', 32, NULL, NULL),
(38, 'Benchwright Round Oak', '/img/Living/Benchwright Round/Benchwright Round Oak', '#1A1B20', 32, NULL, NULL),
(39, 'Benchwright Round Rustic Brown', '/img/Living/Benchwright Round/Benchwright Round Rustic Brown', '#50341E', 32, NULL, NULL),
(40, 'Benchwright Round Seadrift', '/img/Living/Benchwright Round/Benchwright Round Seadrift', '#B9A98F', 32, NULL, NULL),
(41, 'Benchwright Square Seadrift', '/img/Living/Benchwright Square/Benchwright Square Seadrift', '#B59B81', 33, NULL, NULL),
(42, 'Benchwright Square Gray Wash', '/img/Living/Benchwright Square/Benchwright Square Gray Wash', '#B9A98F', 33, NULL, NULL),
(43, 'Benchwright Square Oak', '/img/Living/Benchwright Square/Benchwright Square Oak', '#323234', 33, NULL, NULL),
(44, 'Benchwright Square Rustic Brown', '/img/Living/Benchwright Square/Benchwright Square Rustic Brown', '#442105', 33, NULL, NULL),
(45, 'Malcom Square Glazed Pine', '/img/Living/Malcom Square/Malcom Square Glazed Pine', '#9A6E51', 34, NULL, NULL),
(46, 'Malcom Square Vintage White Wash', '/img/Living/Malcom Square/Malcom Square Vintage White Wash', '#C0A886', 34, NULL, NULL),
(47, 'Reed Rectangular Warm Black', '/img/Living/Reed Rectangular/Reed Rectangular Warm Black', '#2B2C2B', 35, NULL, NULL),
(48, 'Reed Rectangular Atique Umber', '/img/Living/Reed Rectangular/Reed Rectangular Atique Umber', '#9A734C', 35, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `is_admin`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Patrick', 'patrickresol@gmail.com', 1, NULL, '$2y$12$OlcnY9EDE117qJZG3e/6PupG7MtdU2PMxYgp3uGq9ooHT0vGd.yAm', NULL, '2023-11-27 12:56:53', '2023-11-27 12:56:53'),
(3, 'Yamil', 'yamilmoreno@gmail.com', 1, NULL, '$2y$12$erdEoYOE2SPojL1Gx0t3t.qM1VlGNLWEKaV0.E1YHy23aCfO3g5/q', NULL, '2023-11-27 13:01:52', '2023-11-27 13:01:52'),
(4, 'Susan', 'susan@gmail.com', 0, NULL, '$2y$12$KuVt4fUDQbZ0WoZNPqjVQ.htXnUbPPFADQ3UaQjSiDmc3d55CUk36', NULL, '2023-11-27 13:02:42', '2023-11-27 13:02:42'),
(5, 'Omar', 'omar@gmail.com', 0, NULL, '$2y$12$77apTHKt3k.4slPJggLwhueQVSjR8ZYmMVieVMTb7XX.TxZ0LKKLC', NULL, '2023-11-27 13:03:15', '2023-11-27 13:03:15'),
(7, 'Gabriel Fonseca', 'gabriel@gmail.com', 0, NULL, '$2y$12$mYl/r1AuDsteaBAE68FFPOPPovB0kV4D6z6cw2tiU2KY3SvCU7PLW', NULL, '2023-11-28 10:37:47', '2023-11-28 10:37:47'),
(11, 'Cynthia West', 'icynwest@gmail.com', 0, NULL, '$2y$12$sVrt/R1EAaqsED8zMfZZeOAt8HhR.T36fypk9DD.M2ZVsVWq3EAZG', NULL, '2023-11-28 14:42:58', '2023-11-28 14:42:58'),
(12, 'Felix', 'felixurrutia@gmail.com', 0, NULL, '$2y$12$ey2EoRBZWiFRSR8hcYiVR.NI2L6f49u1qJpkO1wLEERi34kAodIye', NULL, '2023-11-29 02:59:01', '2023-11-29 02:59:01'),
(13, 'Julian', 'julian@gmail.com', 0, NULL, '$2y$12$Idig4Uzzr/wsaCV0rRE0ROg/O5Ej.MhwABjBfeQf79C5qnXgvk2/y', NULL, '2023-11-29 07:47:38', '2023-11-29 07:47:38'),
(14, 'Felix', 'felix.urrutia@keiseruniversity.edu', 0, NULL, '$2y$12$I5J7zb2GkVztzUX6fPRCfOWq2LLkzydmxIX4Zc4loHk/wpOo7ZPUG', NULL, '2023-12-01 21:33:49', '2023-12-01 21:33:49'),
(19, 'Felix', 'felix.urrutia@keiseruniversity.edu.ni', 0, NULL, '$2y$12$uryMZAWlFXs5qRnao/9T6eG0JoSvR8JtzwWN.I6e3OS5U4Q.awro.', NULL, '2023-12-07 01:58:43', '2023-12-07 01:58:43'),
(20, 'Elena', 'elena@gmail.com', 0, NULL, '$2y$12$mYLVQMCuX/bVx2TbDlCcWubkU0HkqMHx450tkyQGBEbkX1rKWT9i6', NULL, '2023-12-07 02:25:58', '2023-12-07 02:25:58'),
(220, 'Rene', 'rene@gmail.com', 0, NULL, '$2y$12$4T3m0VNJE6rDOKWehOBsJ.Mx2gv4r/pyoXZeoFOs1COQM/1/sVKz.', NULL, '2023-12-08 04:16:15', '2023-12-08 04:16:15'),
(221, 'Ronald', 'projunior@gmail.com', 0, NULL, '$2y$12$7j8aYbtbc6HAyppSIftPN.R/3lqvWcTV.avghkTaA38nW5G2VCULu', NULL, '2023-12-11 10:48:09', '2023-12-11 10:48:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `whislist`
--

CREATE TABLE `whislist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `addresses_user_id_unique` (`user_id`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indices de la tabla `product_variations`
--
ALTER TABLE `product_variations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_variations_product_id_foreign` (`product_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `whislist`
--
ALTER TABLE `whislist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `whislist_user_id_product_id_unique` (`user_id`,`product_id`),
  ADD KEY `whislist_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=306;

--
-- AUTO_INCREMENT de la tabla `product_variations`
--
ALTER TABLE `product_variations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT de la tabla `whislist`
--
ALTER TABLE `whislist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Filtros para la tabla `product_variations`
--
ALTER TABLE `product_variations`
  ADD CONSTRAINT `product_variations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Filtros para la tabla `whislist`
--
ALTER TABLE `whislist`
  ADD CONSTRAINT `whislist_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `whislist_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
