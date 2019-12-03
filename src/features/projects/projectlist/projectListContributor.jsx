import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const ProjectListContributor = ({contributor}) => {
    return (
      <div>
        <img
          as={Link}
        
          size='mini'
          circular
          src={contributor.photoURL}
        />
      </div>
    );
  }


export default ProjectListContributor;