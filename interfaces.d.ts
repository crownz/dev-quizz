interface State {
  loading: boolean;
  progress: Question[];
  result: Result;
}

interface Question {
  id: string;
  label: string;
  type: string;
  variants?: Variant[];
  selected?: any;
  valid?: boolean;
}

interface Variant {
  label: string;
  value: any;
}

interface Result {
  total: number;
  correct: number;
}
