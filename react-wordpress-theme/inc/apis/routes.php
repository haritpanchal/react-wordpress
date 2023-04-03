<?php
/**
 * Routes file.
 *
 * @package WordPress
 */

/**
 * API Route created.
 */
function api_vendor_cms_callback() {
	header( 'Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Wpml-Language', true );
	header( 'Access-Control-Allow-Origin: *' );

	register_rest_route(
		'auth',
		'/login',
		array(
			'methods'  => 'POST',
			'callback' => 'user_login_callback',
		)
	);
	register_rest_route(
		'auth',
		'/register',
		array(
			'methods'  => 'POST',
			'callback' => 'user_register_callback',
		)
	);
	register_rest_route(
		'auth',
		'/getAllUsers',
		array(
			'methods'  => 'POST',
			'callback' => 'get_all_users_callback',
		)
	);
	register_rest_route(
		'user',
		'/getDetails',
		array(
			'methods'  => 'POST',
			'callback' => 'get_user_details_callback',
		)
	);
	register_rest_route(
		'user',
		'/updateDetails',
		array(
			'methods'  => 'POST',
			'callback' => 'update_user_details_callback',
		)
	);
	register_rest_route(
		'user',
		'/deleteUser',
		array(
			'methods'  => 'POST',
			'callback' => 'delete_user_callback',
		)
	);

}
add_action( 'rest_api_init', 'api_vendor_cms_callback' );


