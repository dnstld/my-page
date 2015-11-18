<?php
	$nome = $_POST["nome"];
	$email = $_POST["email"];
	$mensagem = $_POST["mensagem"];
	
	$para = "contato@denistoledo.com.br";
	$msg = "
		<b>Nome:</b> $nome<br />
		<b>E-mail:</b> $email<br />
		<b>Mensagem:</b> $mensagem<br />
	";
	
	$header = "From: $email \r\n";
	$header .= "Content-Type: text/html; charset=utf-8 \r\n";
	
	mail($para,$assunto,$msg,$header);

	echo "<script type="text/javascript">";
	echo "alert("Aeeee");";
	echo "</script>";
?>
