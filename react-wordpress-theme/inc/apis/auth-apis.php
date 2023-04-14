<?php
/**
 * Auth APIs file.
 *
 * @package WordPress
 */

/**
 * API regiser callback.
 *
 * @param WP_REST_Request $request request.
 */
function user_register_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

	$response = array();

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

	if ( ! empty( $data['email_address'] ) ) {
		$email_address = sanitize_email( $data['email_address'] );
		if ( ! is_email( $email_address ) ) {
			$response['message'] = 'Invalid email';
			return wp_send_json_error( $response );
		}
		if ( email_exists( $email_address ) ) {
			$response['message'] = 'Email already exists';
			return wp_send_json_error( $response );
		}
	} else {
		$response['message'] = 'Email address can not be empty';
		return wp_send_json_error( $response );
	}

	$password     = $data['password'];
	$roles_array  = array( 'student', 'teacher' );
	$data['role'] = 'student';

	// if ( ! empty( $data['role'] ) ) {
	// 	$role = sanitize_text_field( $data['role'] );
	// 	if ( ! in_array( $role, $roles_array, true ) ) {
	// 		$response['message'] = 'Invalid user role.';
	// 		return wp_send_json_error( $response );
	// 	}
	// } else {
	// 	$response['message'] = 'Role can not be empty';
	// 	return wp_send_json_error( $response );
	// }

	// if ( 'teacher' === $role ) {
	// 	$referal_code = wp_generate_password( '8', false, false );
	// }
	// if ( 'student' === $role ) {
	// 	$referal_code = $request['referal_code'];
	// 	if ( empty( $referal_code ) ) {
	// 		$response['message'] = 'Referal code is required';
	// 		return wp_send_json_error( $response );
	// 	}
	// 	$args = array(
	// 		'role'       => 'teacher',
	// 		'meta_key'   => 'teacher_referal_code',
	// 		'meta_value' => $referal_code,
	// 	);

	// 	$user_query = new WP_User_Query( $args );

	// 	if ( ! empty( $user_query->results ) ) {
	// 		foreach ( $user_query->results as $user ) {
	// 			$teacher_id                 = $user->ID;
	// 			$teacher_number_of_accounts = (int) get_user_meta( $teacher_id, 'number_of_account_purchase', true );

	// 			if ( true === $teacher_number_of_accounts > 0 ) {
	// 				$updated_teacher_number_of_accounts = $teacher_number_of_accounts - 1;
	// 				update_user_meta( $teacher_id, 'number_of_account_purchase', $updated_teacher_number_of_accounts );
	// 			} else {
	// 				$response['message'] = 'Referal code has expired';
	// 				return wp_send_json_error( $response );
	// 			}
	// 		}
	// 	} else {
	// 		$response['message'] = 'Invalid referal code';
	// 		return $response;
	// 	}
	// }

	$user_id = wp_create_user( $email_address, $password, $email_address );

	if ( is_wp_error( $user_id ) ) {
		$error_code    = array_key_first( $user_id->errors );
		$error_message = $user_id->errors[ $error_code ][0];
		return wp_send_json_error( $error_message );
	} else {
		// if ( 'teacher' === $role ) {
		// 	update_user_meta( $user_id, 'teacher_referal_code', $referal_code );
		// 	update_user_meta( $user_id, 'number_of_account_purchase', 10 );
		// }
		$response['message']        = 'User created successfully';
		$user_data['id']            = $user_id;
		$user_data['first_name']    = $first_name;
		$user_data['second_name']   = $second_name;
		$user_data['email_address'] = $email_address;
		$user_data['role']          = $role;
		// if ( 'teacher' === $role ) {
		// 	$user_data['teacher_referal_code'] = $referal_code;
		// }

		$wp_user_object = new WP_User( $user_id );
		$wp_user_object->set_role( $role );
		update_user_meta( $user_id, 'first_name', $first_name );
		update_user_meta( $user_id, 'last_name', $second_name );

		$response['data'] = $user_data;
		return wp_send_json_success( $response );
	}

}

/**
 * API usee login callback.
 *
 * @param WP_REST_Request $request request.
 */
function user_login_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

	$response = array();
	if ( ! empty( $data['username'] ) ) {
		$username = sanitize_email( $data['username'] );
		if ( ! is_email( $username ) ) {
			$response['message'] = 'Invalid email';
			return wp_send_json_error( $response );
		}
	} else {
		$response['message'] = 'Email address can not be empty';
		return wp_send_json_error( $response );
	}

	$username = $data['username'];
	$password = $data['password'];
	$creds    = array(
		'user_login'    => $username,
		'user_password' => $password,
	);

	$user = wp_signon( $creds, false );

	if ( is_wp_error( $user ) ) {
		$response['message'] = 'Your password is incorrect';
		return wp_send_json_error( $response );
	} else {
		$response['message']    = 'Login successful';
		$response['data']['id'] = base64_encode( $username );
		return wp_send_json_success( $response );
	}

}

/**
 * API Route created.
 *
 * @param WP_REST_Request $request request.
 */
function get_all_users_callback( WP_REST_Request $request ) {
	$response       = array();
	$user_count     = 0;
	$eligible_users = get_users( array( 'role__in' => array( 'student', 'teacher' ) ) );

	foreach ( $eligible_users as $user ) {
		$user_meta                   = get_user_meta( $user->data->ID );
		$user_data['id']             = $user->data->ID;
		$user_data['email']          = $user->data->user_email;
		$user_data['first_name']     = get_user_meta( $user_data['id'], 'first_name', true ) ? get_user_meta( $user_data['id'], 'first_name', true ) : '';
		$user_data['last_name']      = get_user_meta( $user_data['id'], 'last_name', true ) ? get_user_meta( $user_data['id'], 'last_name', true ) : '';
		$user_details[ $user_count ] = $user_data;

		$user_count++;
	}

	return wp_send_json( $user_details );
}
