export const LIST_AGENDA_BUTTON = `
	<li 
	id="agendaBtn" 
	style="
		list-style: none;
		margin-top: 30px;
	">
		<button 
			title="View Agenda Button"
			style="
				width: 95%;
				padding: 12px 16px;
				background-color: #00529f;
				color: white;
				text-decoration: none;
				font-weight: 600;
				font-size: 17px;
				text-align: center;
				border-radius: 8px;
				margin-top: -40px;
				border: 1px solid rgba(18, 7, 145, 1);
			">
			View your weekly agenda
		</button>
	</li>
`;

export function injectShowAgendaButton(
	sidebarTarget: HTMLElement,
	courseCardContainer: HTMLElement
): void {
	$(sidebarTarget).append(LIST_AGENDA_BUTTON);
	$("#agendaBtn").on("click", (event: JQuery.ClickEvent) => {
		event.preventDefault();

		if ($("#agendaBtn button").text() === "View Dashboard") {
			window.location.reload();
			return;
		}

		$(
			".css-1uzyfgj-view-flexItem span.css-18ygipl-view-heading span.hidden-phone"
		).replaceWith("Agenda For This Week");

		$(courseCardContainer).empty();

		// TODO - need to revert the changes by changing the text content to 'Dashboard' and re-rendering the user's course cards

		$("#agendaBtn button").text("View Dashboard");

		return false;
	});
}
