import { Project } from '@/types';

const mergedProject: Project = {
  name: "My Website",
  pages: [
    {
      id: "page-1",
      name: "Home",
      components: [
        {
          id: "component-1",
          type: "text",
          props: { children: "Welcome to My Website!" },
          styles: { fontSize: "24px", color: "#111" }
        }
        // add all other components from your merged builder
      ]
    }
  ]
};

export default mergedProject;
