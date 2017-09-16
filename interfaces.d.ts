interface State {
  loading: boolean;
  progress: Question[];
}

interface Question {
  id: string;
  label: string;
  type: string;
  variants?: Variant[];
  selected?: any;
}

interface Variant {
  label: string;
  value: any;
}
