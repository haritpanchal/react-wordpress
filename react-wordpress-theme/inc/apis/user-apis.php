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
		$role        = $user_obj->roles[1];
		$first_name  = get_user_meta( $user_id, 'first_name', true ) ? get_user_meta( $user_id, 'first_name', true ) : '';
		$second_name = get_user_meta( $user_id, 'last_name', true ) ? get_user_meta( $user_id, 'last_name', true ) : '';
		$email       = $user_obj->data->user_email;

		$user_data['user_id']                    = $user_id;
		$user_data['first_name']                 = $first_name;
		$user_data['second_name']                = $second_name;
		$user_data['email']                      = $email;
		$user_data['role']                       = $role;
		$user_data['teacher_referal_code']       = get_user_meta( $user_id, 'teacher_referal_code', true ) ? get_user_meta( $user_id, 'teacher_referal_code', true ) : '';
		$user_data['number_of_account_purchase'] = get_user_meta( $user_id, 'number_of_account_purchase', true ) ? get_user_meta( $user_id, 'number_of_account_purchase', true ) : '';

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

/**
 * API forgot password callback.
 *
 * @param WP_REST_Request $request request.
 */
function forgot_password_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

	if ( ! empty( $data['email_address'] ) ) {
		$email_address = sanitize_email( $data['email_address'] );
		if ( ! is_email( $email_address ) ) {
			$response['message'] = 'Invalid email';
			return wp_send_json_error( $response );
		}
		if ( ! email_exists( $email_address ) ) {
			$response['message'] = "User doesn't exists.";
			return wp_send_json_error( $response );
		}
	} else {
		$response['message'] = 'Email address can not be empty';
		return wp_send_json_error( $response );
	}

	$user_obj = get_user_by( 'email', $email_address );
	$user_id  = (int) $user_obj->data->ID;
	$username = get_user_meta( $user_id, 'first_name', true ) ? get_user_meta( $user_id, 'first_name', true ) : $user_obj->data->user_nicename;

	$generated_otp = wp_rand( 100000, 999999 );

	update_user_meta( $user_id, 'user_otp_code', (int) $generated_otp );
	update_user_meta( $user_id, 'user_otp_code_time', time() );
	update_user_meta( $user_id, 'otp_sent', true );

	$to      = $email_address;
	$subject = 'OTP for Admin Panel';
	$body    = '<h2>Hello ' . $username . '</h2>';
	$body   .= '<p>OTP to reset your password is: ' . $generated_otp . '</p>';
	$body   .= '<br/><p>Cheers</p>Team Admin Panel';
	$headers = array( 'From: Sender <sender@example.com>', 'Content-Type: text/html; charset=UTF-8' );

	$mail = wp_mail( $to, $subject, $body, $headers );

	$response['message'] = 'OTP sent successfully and will be valid for one minute';
	$response['otp']     = $generated_otp;
	return wp_send_json_success( $response );
}

/**
 * API confirm otp callback.
 *
 * @param WP_REST_Request $request request.
 */
function confirm_otp_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

	if ( ! empty( $data['email_address'] ) ) {
		$email_address = sanitize_email( $data['email_address'] );
		if ( ! is_email( $email_address ) ) {
			$response['message'] = 'Invalid email';
			return wp_send_json_error( $response );
		}
		if ( ! email_exists( $email_address ) ) {
			$response['message'] = "User doesn't exists.";
			return wp_send_json_error( $response );
		}
	} else {
		$response['message'] = 'Enter email in previous tab';
		return wp_send_json_error( $response );
	}

	$user_obj = get_user_by( 'email', $email_address );
	$user_id  = (int) $user_obj->data->ID;

	$is_otp_sent = get_user_meta( $user_id, 'otp_sent', true ) ? (int) get_user_meta( $user_id, 'otp_sent', true ) : '';
	if ( 1 === $is_otp_sent ) {

		$otp = $data['otp'];
		if ( empty( $otp ) ) {
			$response['message'] = 'OTP can not be empty';
			wp_send_json_error( $response );
		}

		$stored_otp          = get_user_meta( $user_id, 'user_otp_code', true ) ? (int) get_user_meta( $user_id, 'user_otp_code', true ) : '';
		$generated_otp_time  = get_user_meta( $user_id, 'user_otp_code_time', true ) ? get_user_meta( $user_id, 'user_otp_code_time', true ) : '';
		$current_time        = time();
		$otp_time_difference = $current_time - $generated_otp_time;
		$generated_otp       = (int) $otp;

		if ( $otp_time_difference > 60 ) {
			$response['message'] = 'OTP expired. Resend?';
			$response['resend']  = true;
			wp_send_json_error( $response );
		} else {
			if ( $generated_otp !== $stored_otp ) {
				$response['message'] = 'Invalid OTP';
				wp_send_json_error( $response );
			} else {
				$response['message'] = 'OTP verified';
				update_user_meta( $user_id, 'otp_verified', true );
				update_user_meta( $user_id, 'otp_sent', false );
				wp_send_json_success( $response );
			}
		}
	} else {
		$response['message'] = 'Did you receive the OTP?';
		wp_send_json_error( $response );
	}
}

/**
 * API reset password callback.
 *
 * @param WP_REST_Request $request request.
 */
function reset_password_callback( WP_REST_Request $request ) {
	$data = json_decode( $request->get_body(), true );

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

	$user_obj        = get_user_by( 'email', $email_address );
	$user_id         = $user_obj->data->ID;
	$is_otp_verified = get_user_meta( $user_id, 'otp_verified', true );
	$username        = get_user_meta( $user_id, 'first_name', true ) ? get_user_meta( $user_id, 'first_name', true ) : $user_obj->data->user_nicename;

	if ( $is_otp_verified ) {
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

		if ( $password !== $confirm_password ) {
			$response['message'] = 'Both passwords are not matching';
			return wp_send_json_error( $response );
		} else {
			update_user_meta( $user_id, 'otp_verified', false );
			wp_set_password( $password, $user_id );

			$to      = $email_address;
			$subject = 'Password reset action';
			$body    = '<h2>Hello ' . $username . '</h2>';
			$body   .= '<p>Your attempt to reset password was successful. You can now login to your account using that password.</p>';
			$body   .= '<br/><p>Cheers</p>Team Admin Panel';
			$headers = array( 'From: Sender <sender@example.com>', 'Content-Type: text/html; charset=UTF-8' );

			$mail = wp_mail( $to, $subject, $body, $headers );

			$response['message'] = 'Password changed successfully';
			return wp_send_json_success( $response );
		}
	} else {
		$response['message'] = "You haven't verified OTP. Try again!";
		return wp_send_json_error( $response );
	}
}
