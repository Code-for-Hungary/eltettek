import React from 'react';
import Layout from './Layout';
import Company from '../components/Company.js';

const CompanyView = (props) => {
  const companyName = props.match.params.name;
  
  return (
    <Layout history={props.history}>
      <Company name={companyName} history={props.history}/>
    </Layout>
  );
};

export default CompanyView;
