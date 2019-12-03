import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { objectToArray } from "../../../app/utils/helpers";
import ProjectListContributor from "./projectListContributor";

const ProjectListItem = ({ project }) => (
  <div>
    <img size="tiny" circular src={project.creatorPhotoURL} />

    <p as={Link} to={`project/${project.id}`}>
      {project.title}
    </p>
    <p>
      created by{" "}
    
    </p>



    {project.contributors &&
      objectToArray(project.contributors).map(contributor => (
        <ProjectListContributor
          key={contributor.id}
          contributor={contributor}
        />
      ))}

    <button as={Link} to={`/projects/${project.id}`} />
  </div>
);

export default ProjectListItem;
