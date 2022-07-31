import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Overview from "./sections/Overview";
import {
  QuestionAnswer,
  ValidationStatus,
} from "@toppick/common/build/interfaces";

interface SearchResultDialogProps {
  open: boolean;
  answer: QuestionAnswer | null;
  onClose: () => void;
  onDelete?: () => void;
  onSubmit: (answer: QuestionAnswer) => void;
  headerText: string;
  loading: boolean;
  error: string;
}

const DEFAULT_ANSWER: QuestionAnswer = {
  id: -1,
  user_id: "",
  title: "",
  status: ValidationStatus.Active,
};

export default function AnswerDetailDialog({
  answer,
  error,
  headerText,
  loading,
  onClose,
  onSubmit,
  open,
  onDelete,
}: SearchResultDialogProps) {
  const [currentAnswer, setCurrentAnswer] =
    React.useState<QuestionAnswer>(DEFAULT_ANSWER);

  React.useEffect(() => {
    if (answer) {
      setCurrentAnswer(answer);
    } else {
      setCurrentAnswer(DEFAULT_ANSWER);
    }
  }, [answer, open]);

  const setTitle = (e: React.ChangeEvent<any>) => {
    setCurrentAnswer({ ...currentAnswer, title: e.currentTarget.value });
  };

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          title={currentAnswer.title}
          setTitle={setTitle}
          onDelete={onDelete}
        />
      ),
    },
  ];
  return (
    <>
      <AppDialog
        open={open}
        headerText={headerText}
        minWidth={400}
        minHeight={100}
        tabData={tabs}
        showTabs={false}
        loading={loading}
        onRefuse={onClose}
        onConfirm={() => onSubmit(currentAnswer)}
        error={error}
      />
    </>
  );
}
