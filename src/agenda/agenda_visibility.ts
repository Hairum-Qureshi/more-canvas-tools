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
				font-weight: bold;
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

const ASSIGNMENT_BLOCK = `
	<div style="
		border: 1px solid black;
		padding: 10px;
		border-radius: 5px;
		background-color: #00529f;
		color: white;
		word-wrap: break-word;
		font-size: 13px;
	">
		<h4 style="margin: 0;">Assignment Name</h4>
		<p style="margin: 5px 0;">Course Name</p>
		<p style="margin: 0;">Due Date: MM/DD/YYYY</p>
	</div>	
`;

export const YOUR_STATS = `
	<div style="margin-top: 30px;">
		<h2>Your Week At a Glance</h2>
		<ul style="margin-top: 10px; list-style: none; margin-left: 0px;">
			<li style="margin-bottom: 10px;">You have <strong>3</strong> assignments due this week.</li>
			<li style="margin-bottom: 10px;">You have <strong>1</strong> quiz due this week.</li>
			<li style="margin-bottom: 10px;">You have <strong>2</strong> discussion posts due this week.</li>
		</ul>
		<p style="margin-top: 10px; font-weight: bold; text-align: center; color: #00529f;">Check your agenda for a detailed weekly breakdown</p>
	</div>
`;

function getWeekDateRange() {
	const curr = new Date(); // get current date
	const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	const last = first + 6; // last day is the first day + 6

	const firstDate = new Date(curr);
	firstDate.setDate(first);

	const lastDate = new Date(curr);
	lastDate.setDate(last);

	const options: Intl.DateTimeFormatOptions = {
		month: "2-digit",
		day: "2-digit"
	};

	const firstday = firstDate.toLocaleDateString(undefined, options);
	const lastday = lastDate.toLocaleDateString(undefined, options);

	return `${firstday} - ${lastday} ${curr.getFullYear()}`;
}

export const WEEK = `
	<div style="margin: 3% 0 3% 0; text-align: center;">
		<h2 style="font-weight: bold;">Week of ${getWeekDateRange()}</h2>
	</div>
	<table style="
		width: 100%;
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
				<td style="
					border: 1px solid black; 
					padding: 10px; 
					vertical-align: top;" id = "sundayBlock"></td>
				<td style=
					"border: 1px solid black; 
					padding: 10px; 
					vertical-align: 
					top;" id = "mondayBlock"></td>
				<td style="
					border: 1px solid black; 
					padding: 10px; 
					vertical-align: top;" id = "tuesdayBlock"></td>
				<td style="
					border: 1px solid black; 
					padding: 10px; 
					vertical-align: top;" id = "wednesdayBlock"></td>
				<td style="
					border: 1px solid black; 
					padding: 10px; 
					vertical-align: top;" id = "thursdayBlock"></td>
				<td style="
					border: 1px solid black; 
					padding: 10px; 
					vertical-align: top;" id = "fridayBlock"></td>
				<td style="
					border: 1px solid black; 
					padding: 10px; 
					vertical-align: top;" id = "saturdayBlock"></td>
			</tr>
		</tbody>
	</table>
`;

async function getUserToDos() {
	const endpointURL = "https://udel.instructure.com/api/v1/users/self/todo";
	const data = await fetch(endpointURL)
		.then(res => {
			if (!res.ok) {
				throw new Error(`HTTP error: ${res.status}`);
			}
			return res.json();
		})
		.catch(err => {
			console.error("Fetch failed:", err);
			return null;
		});

	const importantData: {
		url: string;
		courseName: string;
		dayDue: string;
		timeDue: string;
		assignmentTitle: string;
	}[] = [];

	if (!data) return;

	const weekDays: readonly string[] = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	data.forEach((todo: any) => {
		const obj = {
			url: todo.html_url,
			courseName: todo.context_name,
			dayDue: weekDays[new Date(todo.assignment.due_at).getDay()],
			timeDue: new Date(todo.assignment.due_at).toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit"
			}),
			assignmentTitle: todo.assignment.name.split(" ").splice(1).join(" ")
		};

		importantData.push(obj);
	});

	console.log(importantData);
}

getUserToDos();

export function injectShowAgendaButton(
	sidebarTarget: HTMLElement,
	courseCardContainer: HTMLElement
): void {
	const dashboardCourseCardOriginalHTML = $(courseCardContainer).html();

	const dashboardHeader = $(
		".css-1uzyfgj-view-flexItem span.css-18ygipl-view-heading span.hidden-phone"
	);

	$(sidebarTarget).append(LIST_AGENDA_BUTTON);
	$(sidebarTarget).append(YOUR_STATS);

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

		const ASSIGNMENTS = [""]; // placeholder to toggle between empty and non-empty assignment list for testing purposes
		!ASSIGNMENTS.length
			? $(courseCardContainer).append(
					`<h2 style="width: 100%; text-align: center; margin-top: 10%;">You're all caught up for this week! 🎉 <br />Wanna get a head start on next week's work? 👀</h2>`
				) // TODO - maybe add functionality to show upcoming assignments for next week and a button to view it
			: $(courseCardContainer).append(WEEK);

		$("#sundayBlock").append(ASSIGNMENT_BLOCK);
		$("#agendaBtn button").text("View Dashboard");

		return false;
	});
}
