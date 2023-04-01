<?php
/**
 * Funtions file.
 *
 * @package WordPress
 */

add_role( 'student', 'Student' );
add_role( 'teacher', 'Teacher' );
remove_role( 'superintendent' );
remove_role( 'contributor' );
remove_role( 'author' );
// remove_role( 'subscriber' );
remove_role( 'editor' );

/**
 * Proper way to enqueue scripts and styles
 */
function wpdocs_theme_name_scripts() {
	wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css', '', '1.0.0' );
	wp_enqueue_style( 'style', get_stylesheet_directory_uri() . '/style.css', '', '1.0.0' );
	wp_enqueue_script( 'js-bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js', array(), '1.0.0', true );
	wp_enqueue_script( 'js-jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js', array(), '1.0.0', true );
	wp_enqueue_script( 'js-ajax', get_stylesheet_directory_uri() . '/assets/js/ajax.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );


require_once get_stylesheet_directory() . '/inc/apis/routes.php';
require_once get_stylesheet_directory() . '/inc/apis/auth-apis.php';
require_once get_stylesheet_directory() . '/inc/apis/user-apis.php';
