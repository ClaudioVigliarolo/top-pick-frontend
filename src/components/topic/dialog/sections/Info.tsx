import React from "react";
import { CONSTANTS } from "@/constants/app";
import Select from "@/components/ui/select/SimpleSelect";
import { makeStyles } from "@material-ui/core";
import Chip from "@/components/ui/select/ObjectChip";
import TagSelector from "@/components/ui/select/TagSelector";
import {
  BooleanValues,
  TopicFeatured,
  TopicInterest,
  TopicLevel,
  TopicTag,
} from "@toppick/common/build/interfaces";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    alignItems: "center",
    marginTop: 20,
  },
  TagSelectorContainer: {
    marginTop: 10,
    maxWidth: "80%",
  },
  selectContainer: {
    marginTop: 20,
  },
}));

interface InfoProps {
  handleSourceChange: (event: React.ChangeEvent<any>) => void;
  handleLevelChange: (event: React.ChangeEvent<any>) => void;
  handleFeaturedChange: (event: React.ChangeEvent<any>) => void;
  handleInterestsChange: (index: number) => void;
  source: string;
  interests: TopicInterest[];
  selectedInterests: TopicInterest[];
  level: TopicLevel;
  onTagRemove: (i: number) => void;
  onTagAdd: (title: string) => void;
  tags: TopicTag[];
  featured: string;
}
const TOPIC_LEVELS = Object.values(TopicLevel);

export default function Info({
  handleSourceChange,
  source,
  handleLevelChange,
  selectedInterests,
  handleInterestsChange,
  level,
  onTagRemove,
  tags,
  interests,
  onTagAdd,
  featured,
  handleFeaturedChange,
}: InfoProps) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classes.selectContainer}>
          <Select
            handleChange={handleSourceChange}
            value={
              CONSTANTS.TOPIC_SOURCES[CONSTANTS.TOPIC_SOURCES.indexOf(source)]
            }
            values={CONSTANTS.TOPIC_SOURCES}
            color="black"
            width={350}
            header="Source"
            defaultValue={CONSTANTS.TOPIC_SOURCES[0]}
          />
        </div>
        <div className={classes.selectContainer}>
          <Select
            handleChange={handleLevelChange}
            value={level}
            values={TOPIC_LEVELS}
            color="black"
            width={350}
            header="Level"
            defaultValue={level}
          />
        </div>

        <div className={classes.selectContainer}>
          <Select
            handleChange={handleFeaturedChange}
            value={featured}
            values={Object.values(BooleanValues)}
            color="black"
            width={350}
            header="Featured"
            defaultValue={featured}
          />
        </div>
        <div className={classes.selectContainer}>
          <Chip
            width={350}
            selectedValues={selectedInterests}
            values={interests}
            header="Topic Interests"
            handleChange={handleInterestsChange}
          />
        </div>

        <div className={classes.TagSelectorContainer}>
          <TagSelector tags={tags} onRemove={onTagRemove} onAdd={onTagAdd} />
        </div>
      </div>
    </>
  );
}
