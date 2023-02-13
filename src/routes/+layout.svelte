<script>
	import '../app.css';
</script>

<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
		<title>Pokedex</title>
	</head>
	<body class="bg-slate-100">
		<div class="max-w-md m-auto bg-white min-h-screen">
			<nav class="flex flex-row gap-4 p-4">
				<a href="/">Home</a>
				<a href="/about">About</a>
			</nav>
			<div class="px-4">
				<slot />
			</div>
		</div>
	</body>
</html>
