<svelte:head>
	<title>About</title>
</svelte:head>

<style lang="scss">
	@import '../../style/theme.scss';
	
	h1 {
		@include test;

		span {
			color: green;
		}
	}
</style>

<h1><span>About this site</span></h1>

<p>This is the 'about' page. There's not much here.</p>