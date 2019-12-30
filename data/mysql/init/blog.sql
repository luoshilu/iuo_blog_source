-- Adminer 4.7.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `luo_comment`;
CREATE TABLE `luo_comment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `content_id` int(10) DEFAULT NULL,
  `demo_id` int(10) DEFAULT NULL,
  `author` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `url` varchar(200) DEFAULT NULL,
  `ip` varchar(64) DEFAULT NULL,
  `agent` varchar(500) DEFAULT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` int(10) DEFAULT NULL,
  `parent_id` int(10) DEFAULT '0',
  `create_time` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `luo_comment` (`id`, `content_id`, `demo_id`, `author`, `email`, `url`, `ip`, `agent`, `text`, `status`, `parent_id`, `create_time`) VALUES
(38,	10,	NULL,	'Cucumber flesh',	'your_email@xx.com',	NULL,	'113.87.130.3',	NULL,	'沙发哇',	99,	0,	1573659771),
(39,	9,	NULL,	'areca flesh',	'your_email@xx.com',	NULL,	'113.87.130.3',	NULL,	'🙈',	99,	0,	1573660189);

DROP TABLE IF EXISTS `luo_config`;
CREATE TABLE `luo_config` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `value` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `luo_config` (`id`, `name`, `value`) VALUES
(1,	'site',	'{\"title\":\"这个设置没啥用\",\"url\":\"\",\"keywords\":\"seo有点用\",\"description\":\"seo有点用\",\"footer\":\"这个设置没啥用\",\"logo\":\"/uploads/2019/02/723c6387289a5d9dcf1ae10cacc5ea96.jpg\",\"cdn\":\"\"}');

DROP TABLE IF EXISTS `luo_content`;
CREATE TABLE `luo_content` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `user_id` int(10) NOT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `thumb` varchar(200) DEFAULT NULL,
  `category_id` int(10) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `type` varchar(20) NOT NULL,
  `description` text,
  `markdown` text,
  `content` text,
  `create_time` int(10) NOT NULL,
  `modify_time` int(10) NOT NULL,
  `view` int(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `luo_content` (`id`, `title`, `user_id`, `slug`, `thumb`, `category_id`, `status`, `type`, `description`, `markdown`, `content`, `create_time`, `modify_time`, `view`) VALUES
(9,	'关于',	1,	'about',	NULL,	0,	99,	'page',	'',	'\n> 这里随便写写好了\n\n',	'<blockquote>\n<p>这里随便写写好了</p>\n</blockquote>\n',	1523170248,	1573840699,	763),
(10,	'链接',	1,	'links',	NULL,	0,	99,	'page',	'',	'\n### 友链\n  <ul class=\"flinks\">\n    <li><a href=\"https://asyncc.com\" target=\"_blank\"> \n       <span>&#127853 </span>IUO 喵喵喵</a> \n    </li>\n</ul>',	'<h3><a id=\"_1\"></a>友链</h3>\n  <ul class=\"flinks\">\n    <li><a href=\"https://asyncc.com\" target=\"_blank\"> \n       <span>&#127853 </span>IUO 喵喵喵</a> \n    </li>\n</ul>',	1524250347,	1573840713,	775),
(90,	'hi, 欢迎使用 iuo_blog!',	1,	'9319b1ef7a1fd1eac64817b7568a5a41',	NULL,	50,	99,	'post',	'<p>恭喜你，安装成功。<br />\n快去管理员后台发布文章吧！</p>\n',	'\n恭喜你，安装成功。\n快去管理员后台发布文章吧！\n\n<!--more-->\n\n### 后台地址\n> https://xxxxxx/admin.html\n> 用户名: admin\n> 密码: admin1234\n\n### 数据库\n> http://ip:8088\n> root/root123\n\n> 提示：平时要导出你的mysql文件做备份哦..\n',	'<p>恭喜你，安装成功。<br />\n快去管理员后台发布文章吧！</p>\n<!--more-->\n<h3><a id=\"_6\"></a>后台地址</h3>\n<blockquote>\n<p>https://xxxxxx/admin.html<br />\n用户名: admin<br />\n密码: admin1234</p>\n</blockquote>\n<h3><a id=\"_11\"></a>数据库</h3>\n<blockquote>\n<p>http://ip:8088<br />\nroot/root123</p>\n</blockquote>\n<blockquote>\n<p>提示：平时要导出你的mysql文件做备份哦…</p>\n</blockquote>\n',	1573860836,	1573840657,	14);

DROP TABLE IF EXISTS `luo_demo`;
CREATE TABLE `luo_demo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `user_id` int(10) NOT NULL,
  `thumb` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `status` int(10) NOT NULL,
  `direct_url` int(10) DEFAULT NULL,
  `slug` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `html` text CHARACTER SET utf8 COLLATE utf8_bin,
  `css` text CHARACTER SET utf8 COLLATE utf8_bin,
  `js` text CHARACTER SET utf8 COLLATE utf8_bin,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin,
  `sort` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '排序',
  `markdown` text CHARACTER SET utf8 COLLATE utf8_bin,
  `description` text CHARACTER SET utf8 COLLATE utf8_bin COMMENT '描述',
  `create_time` int(10) DEFAULT NULL,
  `motify_time` int(10) DEFAULT NULL,
  `view` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;


DROP TABLE IF EXISTS `luo_meta`;
CREATE TABLE `luo_meta` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `type` varchar(10) NOT NULL,
  `count` int(10) DEFAULT '0',
  `sort` int(10) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `luo_meta` (`id`, `user_id`, `name`, `slug`, `description`, `type`, `count`, `sort`) VALUES
(7,	1,	'css',	'css',	'',	'tag',	1,	0),
(9,	1,	'vue',	'vue',	'',	'tag',	1,	0),
(13,	1,	'nodejs',	'nodejs',	'',	'tag',	1,	0),
(50,	1,	'javascript',	'javascript',	'',	'category',	1,	0);

DROP TABLE IF EXISTS `luo_relationship`;
CREATE TABLE `luo_relationship` (
  `content_id` int(10) NOT NULL,
  `meta_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `luo_relationship` (`content_id`, `meta_id`) VALUES
(90,	9),
(90,	13),
(90,	7);

DROP TABLE IF EXISTS `luo_user`;
CREATE TABLE `luo_user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `qq` varchar(15) DEFAULT NULL,
  `github` varchar(100) DEFAULT NULL,
  `zhihu` varchar(100) DEFAULT NULL,
  `weibo` varchar(100) DEFAULT NULL,
  `password` varchar(50) NOT NULL,
  `encrypt` varchar(10) NOT NULL,
  `last_login_time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `luo_user` (`id`, `username`, `email`, `qq`, `github`, `zhihu`, `weibo`, `password`, `encrypt`, `last_login_time`) VALUES
(1,	'admin',	NULL,	'',	'',	NULL,	NULL,	'a3e05637b076afcb434f9d0d85334e36',	'123',	1577717599);

DROP TABLE IF EXISTS `luo_visitor`;
CREATE TABLE `luo_visitor` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `ip` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `agent` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `num` int(10) NOT NULL,
  `first_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `update_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

INSERT INTO `luo_visitor` (`id`, `ip`, `url`, `agent`, `num`, `first_time`, `update_time`) VALUES
(1,	'127.0.0.1',	'http://localhost:3000/content/page/links',	'axios/0.19.0',	2,	'1577717541.024',	'1577717545.396');

-- 2019-12-30 14:54:23
