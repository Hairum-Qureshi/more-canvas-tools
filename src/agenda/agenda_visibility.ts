export const LIST_AGENDA_BUTTON = `
	<li 
	id="agendaBtn" 
	style="
		list-style: none;
		margin-top: 30px;
	">
		<div>
			<a 
			href="#" 
			title="View Agenda Button"
			style="
				width: 95%;
				padding: 12px 16px;
				background-color: #00529f;
				color: white;
				text-decoration: none;
				font-weight: 600;
				text-align: center;
				border-radius: 8px;
				border: 1px solid rgba(18, 7, 145, 1);
			">
			View your weekly agenda
			</a>
		</div>
	</li>
`;

export function injectShowAgendaButton(
	sidebarTarget: HTMLElement,
	courseCardContainer: HTMLElement
): void {
	$(sidebarTarget).append(LIST_AGENDA_BUTTON);
	$("#agendaBtn").on("click", (event: JQuery.ClickEvent) => {
		event.preventDefault();

		$(
			".css-1uzyfgj-view-flexItem span.css-18ygipl-view-heading span.hidden-phone"
		).replaceWith("Agenda For This Week");

		$(courseCardContainer).empty();

		// $(dashboardTarget)
		// 	.addClass("ic-Dashboard-header__layout")
		// 	.addClass("css-18ygipl-view-heading")
		// 	.text("Agenda");
		return false;
	});
}
