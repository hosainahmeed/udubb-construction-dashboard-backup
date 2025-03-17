import React from 'react';
import PageHeading from '../../Components/Shared/PageHeading';
import { FaEye } from 'react-icons/fa';
import { Select } from 'antd';
import { Link } from 'react-router';

function ProjectDetails() {
  const projectDetails = [
    {
      id: 1,
      name: 'Project Alpha',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project is focused on developing an innovative solution for efficient energy management.',
    },
    {
      id: 2,
      name: 'Project Beta',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project aims to explore renewable energy sources and their integration into existing systems.',
    },
    {
      id: 3,
      name: 'Project Gamma',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project is about creating a smart home system that optimizes energy usage.',
    },
    {
      id: 4,
      name: 'Project Delta',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project focuses on developing a mobile application for monitoring energy consumption.',
    },
    {
      id: 5,
      name: 'Project Epsilon',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project aims to design an energy-efficient transportation system.',
    },
    {
      id: 6,
      name: 'Project Zeta',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project involves the development of a sustainable building design.',
    },
    {
      id: 7,
      name: 'Project Eta',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project is focused on energy recovery and waste management solutions.',
    },
    {
      id: 8,
      name: 'Project Theta',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project explores the potential of solar energy in urban areas.',
    },
    {
      id: 9,
      name: 'Project Iota',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'This project aims to develop an AI system for optimizing industrial energy consumption.',
    },
  ];
  return (
    <div>
      <PageHeading text={'Project Details'} />
      <div>
        <div className="flex justify-between items-center my-3">
          <h1 className="flex-1">Project Image</h1>
          <div className="w-[300px]">
            <Select
              placeholder="Select project"
              style={{ width: '100%' }}
              onChange={(value) => {
                const selectedProject = projectDetails.find(
                  (project) => project.id === Number(value)
                );
                if (selectedProject) {
                  setImage(selectedProject.image);
                }
              }}
            >
              {projectDetails.map((project) => (
                <Select.Option key={project.id} value={String(project.id)}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {projectDetails.slice(0, 3).map((project, idx) => (
            <div
              className="relative rounded-2xl overflow-hidden"
              key={project.id}
            >
              <div className="w-full h-full">
                <img
                  className="w-full h-full"
                  src={project.image}
                  alt={project.name}
                />
              </div>
              {idx === 2 && (
                <Link
                to={`/project-all_photos`}
                state={{ projectDetails: projectDetails }}
                >
                  <div className="underline cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#1111114e] hover:backdrop-blur-sm hover:transition-all text-white">
                    <h1 className="flex items-center gap-2">
                      <FaEye /> View All
                    </h1>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="my-12 grid grid-cols-2 gap-4">
          <div>
            <h1>Project Woner Email</h1>
            <div className="rounded-lg bg-[#e2e1e1] border border-[#c2c1c1] p-3">
              exmple@gmail.com
            </div>
          </div>
          <div>
            <h1>Project Name</h1>
            <div className="rounded-lg bg-[#e2e1e1] border border-[#c2c1c1] p-3">
              UrbanCrafters
            </div>
          </div>
          <div className="col-span-2">
            <h1>Project Title</h1>
            <div className="rounded-lg bg-[#e2e1e1] border border-[#c2c1c1] p-3">
              StructoPro: Innovative Building Solutions
            </div>
          </div>
          <div>
            <h1>Project Start Date</h1>
            <div className="rounded-lg bg-[#e2e1e1] border border-[#c2c1c1]  p-3">
              05/21/12
            </div>
          </div>
          <div>
            <h1>Project Stream Link</h1>
            <div className="rounded-lg bg-[#e2e1e1] border border-[#c2c1c1] p-3">
              https///www.livestreamlink.com
            </div>
          </div>
        </div>
        <div className="mt-12  grid grid-cols-3 gap-4">
          <div>
            <h1 className="text-lg font-semibold">Project Manager</h1>
            <div className="flex items-center gap-3">
              <div className="w-32 h-24 overflow-hidden rounded-md ">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="mt-4">
                <div className="">
                  <p>Name: Md. Hassan Ahammed</p>
                  <p>Phone Number: +99 4584 545 463</p>
                  <p>
                    Email:
                    <a href="mailto:mstkhushiakter333@gmail.com">
                      mstkhushiakter333@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Finance Manager</h1>
            <div className="flex items-center gap-3">
              <div className="w-32 h-24 overflow-hidden rounded-md ">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="mt-4">
                <div className="">
                  <p>Name: Md. Hassan Ahammed</p>
                  <p>Phone Number: +99 4584 545 463</p>
                  <p>
                    Email:
                    <a href="mailto:mstkhushiakter333@gmail.com">
                      mstkhushiakter333@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Office Manager</h1>
            <div className="flex items-center gap-3">
              <div className="w-32 h-24 overflow-hidden rounded-md ">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="mt-4">
                <div className="">
                  <p>Name: Md. Hassan Ahammed</p>
                  <p>Phone Number: +99 4584 545 463</p>
                  <p>
                    Email:
                    <a href="mailto:mstkhushiakter333@gmail.com">
                      mstkhushiakter333@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
