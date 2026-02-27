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
				background-color: #4f46e5;
				color: white;
				text-decoration: none;
				font-weight: 600;
				text-align: center;
				border-radius: 8px;
				border: 1px solid #4338ca;
			">
			View your weekly agenda
			</a>
		</div>
	</li>
`;

export function injectShowAgendaButton(target: HTMLElement) {
	$(target).append(LIST_AGENDA_BUTTON);
	$("#agendaBtn").on("click", (event: JQuery.ClickEvent) => {
		event.preventDefault();
		alert("PRESSED!");
		return false;
	});
}
