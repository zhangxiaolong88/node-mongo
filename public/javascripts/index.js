$(function() {
	var query = function(query) {
		$.ajax({
			type: "GET",
			url: "http://localhost:3000/game/getGames",
			data: query,
			success: function(result) {
				if (result && result.success) {
					var html = "";
					$.each(result.data, function(i, game) {
						html += "<tr>";
						html += "<td><input name='gameCheckbox' type='checkbox' /></td>";
						html += "<td>" + game._id + "</td>";
						html += "<td>" + game.name + "</td>";
						html += "<td>" + game.version + "</td>";
						html += "<td>" + (game.company ? game.company.name : "") + "</td>";
						html += "<td>" + game.create_date + "</td>";
						html += "</tr>";
					});
					$("#gamesTable tbody").html(html);
				}
			}
		});
	};
	query();

	$("#filter").click(function() {
		query({
			gameName: $("#filterGameName").val(),
			gameVersion1: $("#filterGameVersion1").val(),
			gameVersion2: $("#filterGameVersion2").val(),
			companyName: $("#filterCompanyName").val()
		});
	});

	$("#save").click(function() {
		var gameId = $("#gameId").val();

		var data = {
			name: $("#gameName").val(),
			version: $("#gameVersion").val(),
			company: $("#gameCompany").val()
		};

		if (gameId) {
			data._id = gameId;
		}

		$.ajax({
			type: "POST",
			url: "http://localhost:3000/game/saveGame",
			data: data,
			success: function(result) {
				if (result && result.success) {
					query();
				}
			}
		});
	});

	$("#update").click(function() {
		$("input[name='gameCheckbox']").each(function(i, v) {
			if (v.checked) {
				var $tr = $(v).parent().parent();
				var id = $tr.find("td").eq(1).text(),
					name = $tr.find("td").eq(2).text(),
					version = $tr.find("td").eq(3).text(),
					company = $tr.find("td").eq(4).text();

				$("#gameId").val(id);
				$("#gameName").val(name);
				$("#gameVersion").val(version);
				$("#gameCompany").val(company);
			}
		});
	});

	$("#delete").click(function() {
		$("input[name='gameCheckbox']").each(function(i, v) {
			if (v.checked) {
				var $tr = $(v).parent().parent();
				var id = $tr.find("td").eq(1).text();

				$.ajax({
					type: "GET",
					url: "http://localhost:3000/game/deleteGame",
					data: {
						gameId: id
					},
					success: function(result) {
						if (result && result.success) {
							query();
						}
					}
				});
			}
		});
	});
});