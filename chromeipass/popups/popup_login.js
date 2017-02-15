$(function() {
	var global = browser.runtime.getBackgroundPage();

	browser.tabs.query({"active": true, "currentWindow": true}).then(function(tabs) {
		if (tabs.length === 0)
			return; // For example: only the background devtools or a popup are opened
		var tab = tabs[0];

		var logins = global.page.tabs[tab.id].loginList;
		var ul = document.getElementById("login-list");
		for (var i = 0; i < logins.length; i++) {
			var li = document.createElement("li");
			var a = document.createElement("a");
			a.textContent = logins[i];
			li.appendChild(a);
			a.setAttribute("id", "" + i);
			a.addEventListener('click', function(e) {
				var id = e.target.id;
				browser.tabs.sendMessage(tab.id, {
					action: 'fill_user_pass_with_specific_login',
					id: id
				});
				close();
			});
			ul.appendChild(li);
		}
	});
});
