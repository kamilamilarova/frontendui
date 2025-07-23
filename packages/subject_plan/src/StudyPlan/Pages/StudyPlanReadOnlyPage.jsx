import { useState } from "react";
import { useParams } from "react-router";
import { CreateDelayer, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { StudyplanLargeCard } from "../Components";
import { StudyplanReadAsyncAction } from "../Queries";
import { StudyplanPageNavbar } from "./StudyplanPageNavbar";

const StudyplanReadOnlyContent = ({ studyplan }) => (
  <>
    <StudyplanPageNavbar studyplan={studyplan} />
    <StudyplanLargeCard studyplan={studyplan} readOnly={true} />
  </>
);

const StudyplanReadOnlyContentLazy = ({ studyplan }) => {
  const { error, loading, entity, fetch } = useAsyncAction(StudyplanReadAsyncAction, studyplan);
  const [delayer] = useState(() => CreateDelayer());

  // Read-only stránka nepotřebuje handleChange ani handleBlur

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorHandler errors={error} />}
      {entity && <StudyplanReadOnlyContent studyplan={entity} />}
    </>
  );
};

export const StudyplanReadOnlyPage = () => {
  const { id } = useParams();
  const studyplan = { id };
  return <StudyplanReadOnlyContentLazy studyplan={studyplan} />;
};