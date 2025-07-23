
import {
      createBrowserRouter,
      RouterProvider
} from "react-router-dom";
  
import { StudyplanRouterSegment } from "../../../packages/subject_plan/src/StudyPlan/Pages/StudyplanRouterSegment";


import { StudyplanPage } from "../../../packages/subject_plan/src/StudyPlan/Pages/StudyplanPage";
import { DataGeneratorPage } from "../../../packages/subject_plan/src/Data/Pages/DataGeneratorPage";
import { StudyplanReadOnlyPage } from "../../../packages/subject_plan/src/StudyPlan/Pages/StudyPlanReadOnlyPage";



const prefix = "/studyplan" 
export const Routes = [
    
    StudyplanRouterSegment,
    {
        path: `${prefix}/studyplan/random`,
        element: <DataGeneratorPage/>
    },

    {
        path: `${prefix}/studyplan/edit/:id`,
        element: <StudyplanPage/>
    },

    {
        path: `${prefix}/studyplan/view/:id`,
        element: <StudyplanReadOnlyPage/>
    }
    
]

// const router = createBrowserRouter(Routes, {basename: "/ug"});
const router = createBrowserRouter(Routes);
// const router = createProxyBrowseRouter(Routes, {basename: "/ug"});

export const AppRouter = () => <RouterProvider router={router} />
