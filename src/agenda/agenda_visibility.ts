import {
	CalendarEvent,
	CanvasCalendarEvent,
	CanvasEvent
} from "~src/interfaces";

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
		<h2>Your Week at a Glance</h2>
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

const weekDays: readonly string[] = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

// TODO - need to replace 'any' with appropriate data types

// * NOTE: you need to call your functions inside the click event listener for the agenda button so that it fetches the most up-to-date data when the user clicks to view their agenda, otherwise you'll run into a CORS error.

// TODO - may need to replace 'udel.instructure.com' with a more generic 'canvasAPIEndpoint' variable if we want this to work for other schools as well

async function getUserCourse(courseID: number): Promise<string> {
	// in the future, maybe consider saving the user's courses in an object instead of having to send a continuous stream of fetch requests every time we want to get a course name for an assignment, but for now this is the most straightforward way to get the course name for each assignment without having to worry about syncing issues with the course data if we were to save it in an object and then update it every time the user goes to a different course page or something like that
	const endpointURL = `https://udel.instructure.com/api/v1/courses/${courseID}`;
	const courseData: any = await fetch(endpointURL)
		.then(res => {
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			return res.json();
		})
		.catch(err => {
			console.error("Fetch failed:", err);
			return null;
		});

	if (!courseData) return "N/A";

	return courseData.name;
}

async function getUserUpcomingAssignments() {
	const endpointURL = "/api/v1/users/self/upcoming_events";
	const csrfToken = decodeURIComponent(
		document.cookie.match(/_csrf_token=([^;]+)/)?.[1] || ""
	);

	const canvasCalendarEvents: CanvasCalendarEvent[] = await fetch(endpointURL, {
		credentials: "include",
		headers: {
			"X-CSRF-Token": csrfToken,
			Accept: "application/json"
		}
	})
		.then(res => {
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			return res.json();
		})
		.catch(err => {
			console.error("Fetch failed:", err);
			return null;
		});

	if (!canvasCalendarEvents) return;

	const canvasEvent: CanvasEvent[] = [];

	for (const upcomingEventObj of canvasCalendarEvents) {
		const upcomingType = upcomingEventObj.html_url.includes("calendar")
			? "Event"
			: "Assignment"; // TODO - need to factor in an event *could* be a quiz!

		switch (upcomingType) {
			case "Event":
				canvasEvent.push({
					type: "Event",
					url: upcomingEventObj.html_url,
					name: upcomingEventObj.title,
					startTime: upcomingEventObj.start_at,
					endTime: upcomingEventObj.end_at,
					title: upcomingEventObj.title,
					location: (upcomingEventObj as CalendarEvent).location_name || "N/A"
				});
				break;

			case "Assignment":
				canvasEvent.push({
					type: "Assignment",
					url: upcomingEventObj.html_url,
					name: await getUserCourse(upcomingEventObj.assignment!.course_id),
					startTime: upcomingEventObj.start_at,
					endTime: upcomingEventObj.end_at,
					title: upcomingEventObj.title
				});
				break;
		}
	}

	canvasCalendarEvents.map(async (upcomingObj: CanvasCalendarEvent) => {});

	console.log(">", canvasEvent);
	// return data;
}

async function getUserToDos() {
	const endpointURL = "https://udel.instructure.com/api/v1/users/self/todo";
	const data = await fetch(endpointURL, {
		credentials: "include"
	})
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

	// const importantData: {
	// 	url: string;
	// 	courseName: string;
	// 	dayDue: string;
	// 	timeDue: string;
	// 	assignmentTitle: string;
	// }[] = [];

	if (!data) return;

	// const weekDays: readonly string[] = [
	// 	"Sunday",
	// 	"Monday",
	// 	"Tuesday",
	// 	"Wednesday",
	// 	"Thursday",
	// 	"Friday",
	// 	"Saturday"
	// ];

	return data;

	// TODO - need to do the same for upcoming, make sure there are no duplicates, and also verify it's correctly getting the assignment deadlines for the current week

	// data.forEach((todo: any) => {
	// const obj = {
	// 	url: todo.html_url,
	// 	courseName: todo.context_name,
	// 	dayDue: weekDays[new Date(todo.assignment.due_at).getDay()],
	// 	timeDue: new Date(todo.assignment.due_at).toLocaleTimeString([], {
	// 		hour: "2-digit",
	// 		minute: "2-digit"
	// 	}),
	// 	assignmentTitle: todo.assignment.name.split(" ").splice(1).join(" ") // ! does not properly properly get the assignment title - need to fix
	// };

	// importantData.push(obj);
	// });

	// (importantData);
}

async function normalizeData() {
	// return normalizedCourseAssignmentData;
}

normalizeData();
// getUserUpcomingAssignments();
// getUserToDos();

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

	getUserUpcomingAssignments();

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
