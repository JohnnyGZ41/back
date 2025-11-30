import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {GroupProject} from '../../domain/model/group-project.entity';
import {GroupProjectResource} from '../resources/group-project-resource';
import {GroupProjectsResponse} from '../responses/group-projects-response';

export class GroupProjectAssembler implements BaseAssembler<GroupProject, GroupProjectResource, GroupProjectsResponse>{

  toEntityFromResource(resource: GroupProjectResource): GroupProject {
    return new GroupProject({
      id: resource.id,
      memberIds: resource.memberIds,
      gameId: resource.gameId,
    });
  }

  toEntitiesFromResponse(response: GroupProjectsResponse): GroupProject[] {
    return response.groupProjects.map(groupProject => this.toEntityFromResource(groupProject));
  }

  toResourceFromEntity(entity: GroupProject): GroupProjectResource {
    return {
      id: entity.id,
      memberIds: entity.memberIds,
      gameId: entity.gameId,
    } as GroupProjectResource;
  }

}
