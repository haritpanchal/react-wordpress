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

		$user_data['user_id']     = $user_id;
		$user_data['first_name']  = $first_name;
		$user_data['second_name'] = $second_name;
		$user_data['email']       = $email;

		$response['message'] = 'Data listed successfully';
		$response['data']    = $user_data;
		wp_send_json_success( $response );
	}
}

/**
 * API update user details calback.
 *
 * @param WP_REST_Request $request request.
 */
function update_user_details_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

	if ( ! empty( $data['first_name'] ) ) {
		$first_name = sanitize_text_field( $data['first_name'] );
	} else {
		$response['message'] = 'First name can not be empty';
		return wp_send_json_error( $response );
	}

	if ( ! empty( $data['second_name'] ) ) {
		$second_name = sanitize_text_field( $data['second_name'] );
	} else {
		$response['message'] = 'Second name can not be empty';
		return wp_send_json_error( $response );
	}

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
		$user_id = $user_obj->data->ID;
		update_user_meta( $user_id, 'first_name', $first_name );
		update_user_meta( $user_id, 'last_name', $second_name );

		$user_data['user_id']     = $user_id;
		$user_data['first_name']  = $first_name;
		$user_data['second_name'] = $second_name;

		$response['message'] = 'User updated successfully';
		$response['data']    = $user_data;
		wp_send_json_success( $response );
	}
}

/**
 * API deleete user calback.
 *
 * @param WP_REST_Request $request request.
 */
function delete_user_callback( WP_REST_Request $request ) {
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
		require_once ABSPATH . 'wp-admin/includes/user.php';

		$user_id = $user_obj->data->ID;

		if ( wp_delete_user( $user_id ) ) {
			$response = 'User deleted successfully';
			wp_send_json_success( $response );
		} else {
			$response = 'Something wrong';
			wp_send_json_error( $response );
		}
	}
}

/**
 * API change password callback.
 *
 * @param WP_REST_Request $request request.
 */
function change_password_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

	if ( ! empty( $data['password'] ) ) {
		$password = $data['password'];
	} else {
		$response['message'] = 'Password can not be empty';
		return wp_send_json_error( $response );
	}

	if ( ! empty( $data['confirm_password'] ) ) {
		$confirm_password = $data['confirm_password'];
	} else {
		$response['message'] = 'Password can not be empty';
		return wp_send_json_error( $response );
	}

	if ( ! empty( $data['email_address'] ) ) {
		$email_address = sanitize_email( $data['email_address'] );
		if ( ! is_email( $email_address ) ) {
			$response['message'] = 'Invalid email';
			return wp_send_json_error( $response );
		}
	} else {
		$response['message'] = 'Email address can not be empty';
		return wp_send_json_error( $response );
	}

	if ( $password !== $confirm_password ) {
		$response['message'] = 'Both passwords are not matching';
		return wp_send_json_error( $response );
	} else {
		$user_obj = get_user_by( 'email', $email_address );
		$user_id  = $user_obj->data->ID;

		wp_set_password( $password, $user_id );
		$response['message'] = 'Password changed successfully';
		return wp_send_json_success( $response );
	}
}
