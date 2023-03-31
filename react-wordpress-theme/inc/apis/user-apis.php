<?php
/**
 * User APIs file.
 *
 * @package WordPress
 */

/**
 * API Get user details calback.
 *
 * @param WP_REST_Request $request request.
 */
function get_user_details_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

	$email_address = $data['email_address'];
	if ( empty( $email_address ) ) {
		$response['message'] = 'Email address can not be empty';
		wp_send_json_error( $response );
	}

	$user_obj = get_user_by( 'email', $email_address );

	if ( empty( $user_obj ) ) {
		$response['message'] = 'User not found';
		wp_send_json_error( $response );
	} else {
		$user_id     = $user_obj->data->ID;
		$first_name  = get_user_meta( $user_id, 'first_name', true ) ? get_user_meta( $user_id, 'first_name', true ) : '';
		$second_name = get_user_meta( $user_id, 'last_name', true ) ? get_user_meta( $user_id, 'last_name', true ) : '';
		$email       = $user_obj->data->user_email;

		$user_data['first_name']  = $first_name;
		$user_data['second_name'] = $second_name;
		$user_data['email']       = $email;

		$response['message'] = 'Data listed successfully';
		$response['data']    = $user_data;
		wp_send_json_success( $response );
	}
}
