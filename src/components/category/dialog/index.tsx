import React from "react";
import { AppDialog, TabData } from "@/components/ui/dialog/DialogStyles";
import Related from "./sections/Related";
import Overview from "./sections/Overview";
import {
  CategoryCreated,
  CategoryDetail,
  CategoryFeatured,
  Lang,
  TopicFeatured,
} from "@toppick/common/build/interfaces";
import { getCategoryDetails, getTopics } from "@toppick/common/build/api";

interface CategoryDialogProps {
  open: boolean;
  loading: boolean;
  error: string;
  onSubmit: (category: CategoryCreated) => void;
  onClose: () => void;
  headerText: string;
  category: CategoryFeatured | null;
}

const DEFAULT_CATEGORY: CategoryDetail = {
  id: -1,
  title: "",
  slug: "",
  description: "",
  image: "",
  topicCounter: 0,
};

export default function CategoryDialog({
  category,
  headerText,
  loading,
  onSubmit,
  onClose,
  open,
  error,
}: CategoryDialogProps) {
  const [currentCategory, setCurrentCategory] =
    React.useState<CategoryDetail>(DEFAULT_CATEGORY);
  const [topics, setTopics] = React.useState<TopicFeatured[]>([]);
  const [selectedTopics, setSelectedTopics] = React.useState<TopicFeatured[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      try {
        if (category) {
          const categoryDetail = await getCategoryDetails(category.slug);
          setCurrentCategory(categoryDetail);
          const topics = await getTopics({
            category_id: category.id,
            sort_by_title: true,
            include_inactive: true,
          });

          setSelectedTopics(topics);
        } else {
          setCurrentCategory(DEFAULT_CATEGORY);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [category]);

  React.useEffect(() => {
    (async () => {
      try {
        const allTopics = await getTopics({
          sort_by_title: true,
          include_inactive: true,
        });
        setTopics(allTopics);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onConfirm = async () => {
    const newCategory: CategoryCreated = {
      id: currentCategory.id,
      description: currentCategory.description,
      image: currentCategory.image,
      slug: currentCategory.slug,
      title: currentCategory.title,
      topics: selectedTopics.map((topic) => ({
        lang: Lang.EN,
        topic_id: topic.id,
      })),
    };
    onSubmit(newCategory);
  };

  const setDescription = (e: React.ChangeEvent<any>) => {
    setCurrentCategory({
      ...currentCategory,
      description: e.currentTarget.value,
    });
  };

  const setTitle = (e: React.ChangeEvent<any>) => {
    setCurrentCategory({ ...currentCategory, title: e.currentTarget.value });
  };

  const setSlug = (e: React.ChangeEvent<any>) => {
    setCurrentCategory({ ...currentCategory, slug: e.currentTarget.value });
  };

  const setImage = (e: React.ChangeEvent<any>) => {
    setCurrentCategory({ ...currentCategory, image: e.currentTarget.value });
  };

  const isShowSubmit = (): boolean =>
    currentCategory.description != "" &&
    currentCategory.image != "" &&
    selectedTopics.length > 0;

  const handleCategoriesChange = (index: number) => {
    const newSelectedTopics = [...selectedTopics];
    const selectedIndex = selectedTopics.findIndex(
      (selected) => topics[index].id === selected.id
    );
    if (selectedIndex < 0) {
      //selected
      newSelectedTopics.push(topics[index]);
    } else {
      //select
      newSelectedTopics.splice(selectedIndex, 1);
    }
    setSelectedTopics(newSelectedTopics);
  };

  const tabs: TabData[] = [
    {
      label: "Overview",
      children: (
        <Overview
          description={currentCategory.description}
          image={currentCategory.image}
          title={currentCategory.title}
          slug={currentCategory.slug}
          setDescription={setDescription}
          setImage={setImage}
          setTitle={setTitle}
          setSlug={setSlug}
        />
      ),
    },
    {
      label: "Related",
      children: (
        <Related
          selectedTopics={selectedTopics}
          handleCategoriesChange={handleCategoriesChange}
          topics={topics}
        />
      ),
    },
  ];

  return (
    <>
      <AppDialog
        open={open}
        headerText={headerText}
        minWidth={600}
        minHeight={600}
        onConfirm={onConfirm}
        onRefuse={onClose}
        loading={loading}
        tabData={tabs}
        error={error}
        confirmButtonDisabled={!isShowSubmit()}
      />
    </>
  );
}
