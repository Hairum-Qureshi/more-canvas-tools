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

export type TodoType = "grading" | "submitting" | "other";

export type ContextType = "course" | "group";

export interface Todo {
	type: TodoType;
	assignment?: Assignment;
	ignore: string;
	ignore_permanently: string;
	html_url: string;
	needs_grading_count?: number;
	context_type: ContextType;
	course_id?: number;
	group_id?: number | null;
}
