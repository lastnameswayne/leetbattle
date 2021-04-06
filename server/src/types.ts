export interface data {
  source_code: string;
  language_id: number;
  number_of_runs: string;
  stdin: string;
  expected_output: null;
  cpu_time_limit: string;
  cpu_extra_time: string;
  wall_time_limit: string;
  memory_limit: string;
  stack_limit: string;
  max_processes_and_or_threads: string;
  enable_per_process_and_thread_time_limit: boolean;
  enable_per_process_and_thread_memory_limit: boolean;
  max_file_size: string;
  base64_encoded: boolean;
}

export interface output {
  codeOutput: string;
  errorOutput: string;
}

export interface Request {
  data: any;
}
export interface Response {
  data: any;
}
