<?php
/**  Template Name: Register */
get_header();
?>

<div class='text-center'>
	<main class="form-signin w-100 m-auto">
		<form autocomplete="off">
			<img class="mb-4" src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">
			<h1 class="h3 mb-3 fw-normal">Registe user</h1>

			<div class="form-floating">
			<input type="text" class="form-control" name='name' id="name" placeholder="Name" autoComplete='none'>
			<label for="floatingInput">Name</label>
			</div>
			<div class="form-floating">
			<input type="email" class="form-control" name='email' id="email" placeholder="name@example.com">
			<label for="floatingInput">Email address</label>
			</div>
			<div class="form-floating">
			<input type="password" class="form-control" name='password' id="password" placeholder="Password">
			<label for="floatingPassword">Password</label>
			</div>

			<div class="checkbox mb-3">
			<label>
				<input type="checkbox" value="remember-me"> Remember me
			</label>
			</div>
			<button class="w-100 btn btn-lg btn-primary register" type="button">Register</button>	
		</form>
	</main>
</div>

<?php
get_footer();
