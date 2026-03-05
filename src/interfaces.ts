export interface Assignment {
	id: number;
	name: string;
	description: string | null;
	points_possible: number;
	due_at: string;
	assignment_group_id: number;
	automatic_peer_reviews: boolean;
	grade_group_students_individually: boolean | null;
	grading_standard_id: number | null;
	grading_type: string;
	group_category_id: number | null;
	lock_at: string | null;
	peer_reviews: boolean;
	position: number;
	unlock_at: string | null;
	course_id: number;
	submission_types: string[];
	needs_grading_count: number;
	html_url: string;
}

export interface CalendarEventBase {
	id: number | string;
	title: string;
	description: string | null;
	start_at: string;
	end_at: string;
	all_day: boolean;
	all_day_date: string | null;
	created_at: string;
	updated_at: string;
	workflow_state: string;
	context_code: string;
	url: string;
	html_url: string;
}

export interface CalendarEvent extends CalendarEventBase {
	location_name: string | null;
	location_address: string | null;
	child_events_count: number;
	child_events: CalendarEvent[];
	parent_event_id: number | null;
	hidden: boolean;
	assignment?: undefined;
}

export interface AssignmentCalendarEvent extends CalendarEventBase {
	assignment: Assignment;
}

export interface CanvasEvent {
	type: "Event" | "Quiz" | "Assignment";
	url: string;
	name: string;
	startTime: string;
	endTime: string;
	title: string;
	location?: string | null;
	weekday: string;
}

export type CanvasCalendarEvent = CalendarEvent | AssignmentCalendarEvent;
