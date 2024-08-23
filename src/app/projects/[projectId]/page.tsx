"use client";

import classNames from "classnames";
import { useParams } from "next/navigation";

import { useFavoriteProject } from "@/api/mutations/favorites";
import { useGetProjectFavorites } from "@/api/queries/favorites";
import { useGetProjects } from "@/api/queries/projects";
import { Button } from "@/components/Button";
import { InfoCircle } from "@/components/Icons/InfoCircle";
import { Plus } from "@/components/Icons/Plus";
import { Settings } from "@/components/Icons/Settings";
import { PageHeader } from "@/components/PageHeader";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useProjectDetailDisplay } from "@/hooks/useProjectDetailDisplay";
import { PageTitle } from "@/page-components/projects/[projectId]/PageTitle";
import Image from "next/image";
import { LabelUppercaseSmall } from "@/components/Typography/LabelUppercaseSmall";
import { BodyMedium } from "@/components/Typography/BodyMedium";
import { format } from "date-fns";
import { ListTable } from "@/components/LogTable/ListTable/ListTable";
import { ProjectLogTable } from "@/components/LogTable/ProjectLogTable/ProjectLogTable";

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const { visibleProjectDetailPanes, toggle } = useProjectDetailDisplay();

  const isVisible = visibleProjectDetailPanes.some((el) => el === projectId);

  const { data: projectData } = useGetProjects();

  const { data: favoriteData } = useGetProjectFavorites();

  const favorite = useFavoriteProject();

  const project = projectData?.projects.find((el) => el.id === projectId);

  const isFavorite =
    favoriteData?.favoriteProjects.some((el) => el.projectId === projectId) ??
    false;

  const handleOnClick = () => favorite.mutateAsync({ projectId });

  return (
    <ProtectedPage>
      <PageHeader
        title={
          <PageTitle
            isFavorite={isFavorite}
            onClick={handleOnClick}
            title={project?.name ?? "Loading"}
          />
        }
        actions={
          <div className="flex flex-row items-center gap-4">
            <Button
              active={isVisible}
              variant="secondary"
              onClick={() => toggle(projectId)}
            >
              <InfoCircle />
              Details
            </Button>
            <Button variant="secondary" onClick={() => {}}>
              <Settings width={18} height={18} />
              Project Settings
            </Button>
            <Button onClick={() => {}}>
              <Plus />
              Upload Logs
            </Button>
          </div>
        }
      />
      <div className="flex flex-1 flex-row">
        <div className="flex w-full flex-1">
          <ProjectLogTable logs={project?.logs ?? []} />
        </div>
        <div
          className={classNames(
            "transition-[display] ease-in-out  border-l-1 border-l-borderDeemphasis dark:border-l-darkBorderDeemphasis",
            "w-[327px] p-6",
            {
              hidden: !isVisible,
              visible: isVisible,
            }
          )}
        >
          {project?.photo && (
            <Image
              className="rounded-lg mb-10 transition-none w-[279px] max-w-[279px]"
              priority
              src={project.photo}
              height={210}
              width={375}
              alt="Project Photo"
            />
          )}
          {project?.description && (
            <div className="flex flex-col mb-2">
              <LabelUppercaseSmall>Description</LabelUppercaseSmall>
              <BodyMedium variant="main">{project.description}</BodyMedium>
            </div>
          )}
          <div className="flex flex-col">
            <LabelUppercaseSmall>Added</LabelUppercaseSmall>
            <BodyMedium variant="main">
              {project?.createdAt
                ? format(new Date(project?.createdAt), "yyyy-MM-dd")
                : "Loading"}
            </BodyMedium>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default ProjectDetailPage;
