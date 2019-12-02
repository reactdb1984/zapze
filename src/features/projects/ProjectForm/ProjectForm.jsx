import React, { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {initialize} from 'redux-form';
import {useFirestoreConnect, useFirebase, useFirestore} from 'react-redux-firebase';
import {createProject, updateProject} from '../projectActions';
import {
    composeValidators,
    combineValidators,
    isRequired,
    hasLengthGreaterThan
} from 'revalidate';
import renderTextField from "../../../app/common/form/TextInput";
import renderSelectField from "../../../app/common/form/RenderSelectField";

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired({message: 'Please provide a category'}),
    description: composeValidators(
        isRequired({message: 'Please enter a description'}),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('city'),
    venue: isRequired('venue'),
    date: isRequired('date')
});

const ProjectForm = (props) => {
    const { handleSubmit, pristine,match: {params}, history, submitting, classes } = props

    const dispatch = useDispatch();
    const firebase = useFirebase();
    const firestore = useFirestore();

    useFirestoreConnect(`createproject/${params.id}`);
    const project = useSelector(state => (state.firestore.ordered.project && state.firestore.ordered.project.filter(e => e.id === params.id)[0]) || {});

    useEffect(() => {
        if (Object.keys(project).length > 0) {
            dispatch(initialize('projectForm', project))
        }
    }, [dispatch, project]);





    const handleFormSubmit = async values => {
       
        if (project.id) {
            dispatch(updateProject({firestore}, values));
            history.push(`/projects/${project.id}`);
        } else {
            let createdProject = await dispatch(createProject({firebase, firestore}, values));
            history.push(`/projects/${createdProject.id}`);
        }
    };
    return(
        <div>
              <form onSubmit={handleSubmit(handleFormSubmit)}>
       

          <div >
           
          
            
          
         
            <div>
            <Field
                name="title"
                type="text"
                component={renderTextField}
                label="title"
               
                rows={1}
              />
              <Field
                name="description"
                type="description"
                component={renderTextField}
                label="description"
                rows={4}
              />
              <div  styles={{marginBottom
                  : "50px"}}>
              <Field
                classes={classes}
                name="category"
                component={renderSelectField}
                label="category"
               
                
              > 
                <option value="" />
                <option value={"enterprise"}>Enterprise</option>
                <option value={"saas"}>saas</option>
                <option value={"subscription"}>Subscription</option>
                <option value={"transactional"}>Transactional</option>
                <option value={"marketplace"}>Marketplace</option>
                <option value={"e-commerce"}>E-commerce</option>
                <option value={"advertising"}>Advertising</option>


              </Field>
              </div>

              <Field
              styles={{marginTop: "50px"}}
                name='productfit'
                component={renderTextField}
                rows={3}
                
                label='What is the response of the the customers you have approached so far?'
              />

                            <Field
                name='problem'
                component={renderTextField}
                rows={3}
                
                label='What is the problem you are trying to solve?'
              /> 
             
                   <Field
                name='solution'
                component={renderTextField}
                rows={3}
                placeholder='How could you add value to your customers'
              />
            </div>
          </div>
          <div >
           
            <button
            color="primary"
            variant="contained"
            disabled={pristine || submitting}
          >
            Create project
          </button>
          </div>
        </form>
        </div>
    )
}



export default reduxForm({form: 'projectForm', validate})(ProjectForm);
