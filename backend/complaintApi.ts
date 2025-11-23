import { supabase } from "./supabaseClient";

export interface ComplaintPayload {
  student_id?: string | null;
  name: string;
  reg_no?: string | null;
  department?: string | null;
  complaint_text: string;
}

export async function submitComplaint(payload: ComplaintPayload) {
  try {
    const insertObj = {
      student_id: payload.student_id ?? null,
      name: payload.name,
      reg_no: payload.reg_no ?? null,
      department: payload.department ?? null,
      complaint_text: payload.complaint_text,
    };

    const { data, error } = await supabase.from("complaints").insert([insertObj]).select().single();

    if (error) {
      console.error("Failed to insert complaint:", error);
      return { error: error.message };
    }

    return { success: true, complaint: data };
  } catch (err: any) {
    console.error("submitComplaint exception:", err);
    return { error: err?.message ?? String(err) };
  }
}