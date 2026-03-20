import { Todo } from "~src/interfaces";

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

const BLOCK = `
	<div style="
		border: 1px solid black;
		padding: 10px;
		border-radius: 5px;
		background-color: #00529f;
		color: white;
		word-wrap: break-word;
		font-size: 13px;
		margin-bottom: 10px;
	">
		<h4 style="margin: 0;">Assignment Name</h4>
		<p style="margin: 5px 0;">Course Name</p>
		<p style="margin: 0;">Due Date: MM/DD/YYYY</p>
		<button style="
			margin-top: 5px;
			padding: 5px 10px;
			background-color: white;
			color: #00529f;
			border: 1px solid #1d77c0ff;
			border-radius: 4px;
			font-size: 12px;
			cursor: pointer;
		" title="View Assignment Button">
			See Details
		</button>
	</div>	
`;

export const YOUR_STATS = `
	<div style="margin-top: 30px;">
		<h2>Your Week at a Glance</h2>
		<p id = "notice">Press the button above to view your stats.</p>
		<ul style="margin-top: 10px; list-style: none; margin-left: 0px;">
			<li style="margin-bottom: 10px;" id = "numAssignments"></li>
			<li style="margin-bottom: 10px;" id = "numQuizzes"></li>
			<li style="margin-bottom: 10px;" id = "numDiscussions"></li>
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

	const firstDay = firstDate.toLocaleDateString(undefined, options);
	const lastDay = lastDate.toLocaleDateString(undefined, options);

	return {
		firstDay,
		lastDay,
		dateRange: `${firstDay} - ${lastDay} ${curr.getFullYear()}`
	};
}

const { firstDay, lastDay } = getWeekDateRange();
const month = firstDay.split("/")[0];
const day = firstDay.split("/")[1];

const WEEK = `
	<div style="margin: 3% 0 3% 0; text-align: center;">
		<h2 style="font-weight: bold;">Week of ${getWeekDateRange().dateRange}</h2>
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
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;" id = "sundayWeekHeader">
					<h3 style="margin: 0;">Sunday</h3>
					<p style="margin: 0;">${firstDay}</p>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;" id = "mondayWeekHeader">
					<h3 style="margin: 0;">Monday</h3>
					<p style="margin: 0;">${month}/${Number(day) + 1}</p>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;" id = "tuesdayWeekHeader">
					<h3 style="margin: 0;">Tuesday</h3>
					<p style="margin: 0;">${month}/${Number(day) + 2}</p>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;" id = "wednesdayWeekHeader">
					<h3 style="margin: 0;">Wednesday</h3>
					<p style="margin: 0;">${month}/${Number(day) + 3}</p>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;" id = "thursdayWeekHeader">
					<h3 style="margin: 0;">Thursday</h3>
					<p style="margin: 0;">${month}/${Number(day) + 4}</p>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;" id = "fridayWeekHeader">
					<h3 style="margin: 0;">Friday</h3>
					<p style="margin: 0;">${month}/${Number(day) + 5}</p>
				</th>
				<th style="border: 1px solid black; padding: 10px; width: 14.28%;" id = "saturdayWeekHeader">
					<h3 style="margin: 0;">Saturday</h3>
					<p style="margin: 0;">${lastDay}</p>
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

// * NOTE: you need to call your functions inside the click event listener for the agenda button so that it fetches the most up-to-date data when the user clicks to view their agenda, otherwise you'll run into a CORS error.

// TODO - may need to replace 'udel.instructure.com' with a more generic 'canvasAPIEndpoint' variable if we want this to work for other schools as well

// TODO - add a hover effect over the assignment blocks

// TODO - for assignment due date, have it list the time as well

// TODO - make the stats for quizzes and discussion board posts for the week work too

// TODO - maybe add functionality to show upcoming assignments for next week and a button to view it

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

	return courseData.name.split(" ").slice(1).join(" ");
}

async function getUserUpcomingAssignments() {
	const endpointURL = "/api/v1/users/self/todo";
	const csrfToken = decodeURIComponent(
		document.cookie.match(/_csrf_token=([^;]+)/)?.[1] || ""
	);

	const currStudentTodos: Todo[] = await fetch(endpointURL, {
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

	return currStudentTodos;
}

function getWeekday(dateString: string | undefined): string {
	if (!dateString) return "N/A";

	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = { weekday: "long" };
	return date.toLocaleDateString(undefined, options);
}

function deleteTodo(assignmentID: string) {
	const endpointURL = `/api/v1/users/self/todo/assignment_${assignmentID}/submitting?permanent=1`;
	const csrfToken = decodeURIComponent(
		document.cookie.match(/_csrf_token=([^;]+)/)?.[1] || ""
	);

	fetch(endpointURL, {
		method: "DELETE",
		credentials: "include",
		headers: {
			"X-CSRF-Token": csrfToken,
			Accept: "application/json"
		}
	})
		.then(res => {
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			console.log(
				`Successfully deleted todo with assignment id ${assignmentID}`
			);
		})
		.catch(err => {
			console.error("Failed to delete todo:", err);
		});
}

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

		$("#agendaBtn button").text("View Dashboard");

		$(`#notice`).html(
			'<img src = "https://i.ibb.co/Fk1pnB0V/output-onlinegiftools.gif" style = "width: 50px; height: 50px;" /><span>Loading your stats...</span>'
		);

		$(courseCardContainer).html(
			'<div style = "width: 100%; font-size: 20px; text-align: center; margin-top: 10%;" id = "agendaLoadingDiv"><img src = "https://i.ibb.co/Fk1pnB0V/output-onlinegiftools.gif" style = "width: 70px; height: 70px;"><span>Loading your agenda...</span></div>'
		);

		getUserUpcomingAssignments().then((todos: Todo[] | undefined) => {
			$(`#agendaLoadingDiv`).remove();
			if (todos && todos.length) {
				$(courseCardContainer).append(WEEK);

				const currentWeekDay = new Date()
					.toLocaleString("en", { weekday: "long" })
					.toLowerCase();
				$(`#${currentWeekDay}Block`).css("background-color", "#fbe941ff");
				$(`#${currentWeekDay}WeekHeader`).css("background-color", "#fbe941ff");

				let numAssignments = 0;
				let numQuizzes = 0;
				let numDiscussions = 0;

				todos.forEach(async (todo: Todo) => {
					const block = $(BLOCK);

					const courseName: string =
						(await getUserCourse(todo.assignment?.course_id || 0)) || "N/A";

					// TODO - need to figure out how to check for these
					// numQuizzes += todo.type === "Quiz" ? 1 : 0;
					// numDiscussions += todo.type === "Discussion" ? 1 : 0;

					console.log(
						todo.assignment?.availability_status?.date.substring(11, 19)
					);

					block.find("h4").text(todo.assignment?.name || "N/A");
					block.find("p:nth-child(2)").text(courseName);
					block.find("p:nth-child(3)").text(
						`Due Date: ${new Date(todo.assignment?.due_at.toString() || "N/A").toLocaleDateString()} \n Time Due: ${
							new Date(
								todo.assignment?.availability_status?.date || "N/A"
							).toLocaleString("en-US", {
								timeZone: "America/New_York",
								hour: "numeric",
								minute: "2-digit",
								hour12: true
							}) || "N/A"
						}`
					);
					block.find("button").on("click", () => {
						window.open(todo.assignment?.html_url, "_blank");
					});

					block.on("dblclick", () => {
						if (
							confirm(
								`Have you completed "${todo.assignment?.name}" for ${courseName}? Click "OK" to remove it from your agenda.`
							)
						) {
							if (todo.assignment && todo.assignment.id) {
								deleteTodo(todo.assignment.id.toString());
								block.remove();
								$(`#numAssignments`).html(
									`You have <strong>${--numAssignments}</strong> assignment(s) due this week.`
								);
							}
						}

						return;
					});

					// check if it's due this week before appending to the calendar
					const today = new Date();
					const firstDayOfWeek = new Date(
						today.setDate(today.getDate() - today.getDay())
					);
					const lastDayOfWeek = new Date(
						today.setDate(today.getDate() - today.getDay() + 6)
					);

					$(`#notice`).remove();

					const dueDate =
						(todo.assignment && new Date(todo.assignment?.due_at)) || null;

					if (
						dueDate &&
						dueDate >= firstDayOfWeek &&
						dueDate <= lastDayOfWeek
					) {
						numAssignments += todo.assignment ? 1 : 0;
						$(`#numAssignments`).html(
							`You have <strong>${numAssignments}</strong> assignment(s) due this week.`
						);
						$(`#numQuizzes`).html(
							`You have <strong>${numQuizzes}</strong> quiz(zes) due this week.`
						);
						$(`#numDiscussions`).html(
							`You have <strong>${numDiscussions}</strong> discussion post(s) due this week.`
						);
						$(
							`#${getWeekday(todo.assignment?.due_at).toLowerCase()}Block`
						).append(block);
					}
				});
			} else {
				$(courseCardContainer).append(
					`<h2 style="width: 100%; text-align: center; margin-top: 10%;">You're all caught up for this week! 🎉 <br />Wanna get a head start on next week's work? 👀</h2>`
				);
			}
		});

		return false;
	});
}
