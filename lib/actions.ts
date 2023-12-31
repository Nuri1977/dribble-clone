import { ProjectForm } from "@/common.types";
import {
  createNewProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  projectsQueryAll,
  updateProjectMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL!
  : process.env.NEXT_PUBLIC_GRAFBASE_API_URL!;
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!
  : process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!;
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL!
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  client.setHeader("x-api-key", apiKey);
  try {
    //client request
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  console.log("email", email);
  if (!email) {
    return null;
  }
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const resCloudinary = await uploadImage(form.image);

  if (resCloudinary.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: resCloudinary.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createNewProjectMutation, variables);
  }
};

export const fetchAllProjects = async (
  category?: string,
  endcursor?: string
) => {
  if (!category) {
    return makeGraphQLRequest(projectsQueryAll, { endcursor });
  }
  return makeGraphQLRequest(projectsQuery, { category, endcursor });
};

export const getProjectDetails = async (id: string) => {
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = async (id: string, last?: number) => {
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const deleteProject = async (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const updateProject = async (
  form: ProjectForm,
  projectId: string,
  token: string
) => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }
  let updatedForm = { ...form };
  const isUploadingNewImage = isBase64DataURL(form.image);
  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    id: projectId,
    input: updatedForm,
  };
  return makeGraphQLRequest(updateProjectMutation, variables);
};
