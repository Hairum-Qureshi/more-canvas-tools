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

export const WEEK = `
	<table style="
		width: 100%;
		margin-top: 5%;
		border: 2px solid black;
		border-collapse: collapse;
		table-layout: fixed;
		font-family: Arial, sans-serif;
		margin-left: 2%;
	">
		<thead>
			<tr style="background-color: #f2f2f2;">
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;">
					<h3 style="margin: 0;">Sunday</h3>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;">
					<h3 style="margin: 0;">Monday</h3>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;">
					<h3 style="margin: 0;">Tuesday</h3>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;">
					<h3 style="margin: 0;">Wednesday</h3>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;">
					<h3 style="margin: 0;">Thursday</h3>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;">
					<h3 style="margin: 0;">Friday</h3>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;">
					<h3 style="margin: 0;">Saturday</h3>
				</th>
			</tr>
		</thead>

		<tbody style="text-align: center;">
			<tr>
				<td style="border: 1px solid black; padding: 15px;">Data 1</td>
				<td style="border: 1px solid black; padding: 15px;">Data 2</td>
				<td style="border: 1px solid black; padding: 15px;">Data 3</td>
				<td style="border: 1px solid black; padding: 15px;">Data 4</td>
				<td style="border: 1px solid black; padding: 15px;">Data 5</td>
				<td style="border: 1px solid black; padding: 15px;">Data 6</td>
				<td style="border: 1px solid black; padding: 15px;">Data 7</td>
			</tr>
		</tbody>
	</table>
`;

export function injectShowAgendaButton(
	sidebarTarget: HTMLElement,
	courseCardContainer: HTMLElement
): void {
	const dashboardCourseCardOriginalHTML = $(courseCardContainer).html();

	const dashboardHeader = $(
		".css-1uzyfgj-view-flexItem span.css-18ygipl-view-heading span.hidden-phone"
	);

	$(sidebarTarget).append(LIST_AGENDA_BUTTON);
	$("#agendaBtn").on("click", (event: JQuery.ClickEvent) => {
		event.preventDefault();

		if ($("#agendaBtn button").text() === "View Dashboard") {
			$(courseCardContainer).html(dashboardCourseCardOriginalHTML);
			$("#agendaBtn button").text("View your weekly agenda");
			dashboardHeader.text("Dashboard");
			return;
		}

		dashboardHeader.text("Agenda For This Week");

		$(courseCardContainer).empty();
		$(courseCardContainer).append(WEEK);

		$("#agendaBtn button").text("View Dashboard");

		return false;
	});
}
