<?php
/**
 * Funtions file.
 *
 * @package WordPress
 */

add_action( 'show_user_profile', 'user_additional_profile_fields' );
add_action( 'edit_user_profile', 'user_additional_profile_fields' );

/**
 * Add new fields above 'Update' button.
 *
 * @param WP_User $user User object.
 */
function user_additional_profile_fields( $user ) {
	$user_role                  = $user->roles[1];
	$user_id                    = $user->data->ID;
	$teacher_referal_code       = get_user_meta( $user_id, 'teacher_referal_code', true ) ? get_user_meta( $user_id, 'teacher_referal_code', true ) : '';
	$number_of_account_purchase = get_user_meta( $user_id, 'number_of_account_purchase', true ) ? get_user_meta( $user_id, 'number_of_account_purchase', true ) : 0;

	if ( '' !== $teacher_referal_code && 'teacher' === $user_role ) {
		?>
	<h3>User Meta</h3>
	<table class="form-table">
		<tr>
			<th><label for="birth-date-day">Referal Code</label></th>
			<td>
				<input type="text" value="<?php echo esc_attr( $teacher_referal_code ); ?>" readonly="true" />
			</td>
		</tr>
		<tr>
			<th><label for="birth-date-day">Referal Remaining Count</label></th>
			<td>
				<input type="text" value="<?php echo esc_attr( $number_of_account_purchase ); ?>" readonly="true" />
			</td>
		</tr>
	</table>
		<?php
	}
}
