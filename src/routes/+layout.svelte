<script>
	import '../app.css';
</script>

<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Pokedex</title>
	</head>
	<body>
		<nav class="flex flex-row gap-4 p-4">
			<a href="/">Home</a>
			<a href="/about">About</a>
		</nav>
		<div class="px-4">
			<slot />
		</div>
		<footer class="p-4">
			A demo by Zack Webster
		</footer>
	</body>
</html>
