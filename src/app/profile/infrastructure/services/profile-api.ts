import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/infrastructure/base-api';
import {ProfilesApiEndpoint} from './profiles-api-endpoint';
import {PortfoliosApiEndpoint} from './portfolios-api-endpoint';
import {GroupProjectsApiEndpoint} from './group-projects-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../../domain/model/profile.entity';
import {Portfolio} from '../../domain/model/portfolio.entity';
import {GroupProject} from '../../domain/model/group-project.entity';

@Injectable({providedIn: 'root'})
export class ProfileApi extends BaseApi{
  private profilesEndpoint: ProfilesApiEndpoint;
  private portfoliosEndpoint: PortfoliosApiEndpoint;
  private groupProjectsEndpoint: GroupProjectsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.profilesEndpoint = new ProfilesApiEndpoint(http);
    this.portfoliosEndpoint = new PortfoliosApiEndpoint(http);
    this.groupProjectsEndpoint = new GroupProjectsApiEndpoint(http);
  }

  getProfiles(): Observable<Profile[]>{
    return this.profilesEndpoint.getAll();
  }
  getProfile(id: number): Observable<Profile> {
    return this.profilesEndpoint.getById(id);
  }
  createProfile(profile: Profile): Observable<Profile>{
    return this.profilesEndpoint.create(profile);
  }
  updateProfile(profile: Profile): Observable<Profile>{
    return this.profilesEndpoint.update(profile, profile.id);
  }
  deleteProfile(id: number): Observable<void>{
    return this.profilesEndpoint.delete(id);
  }

  getPortfolios():Observable<Portfolio[]>{
    return this.portfoliosEndpoint.getAll();
  }
  getPortfolio(id: number):Observable<Portfolio>{
    return this.portfoliosEndpoint.getById(id);
  }
  createPortfolio(portfolio: Portfolio):Observable<Portfolio>{
    return this.portfoliosEndpoint.create(portfolio);
  }
  updatePortfolio(portfolio: Portfolio):Observable<Portfolio>{
    return this.portfoliosEndpoint.update(portfolio,portfolio.id);
  }
  deletePortfolio(id: number):Observable<void>{
    return this.portfoliosEndpoint.delete(id);
  }

  getGroupProjects():Observable<GroupProject[]>{
    return this.groupProjectsEndpoint.getAll();
  }
  getGroupProject(id: number):Observable<GroupProject>{
    return this.groupProjectsEndpoint.getById(id);
  }
  createGroupProject(groupProject: GroupProject):Observable<GroupProject>{
    return this.groupProjectsEndpoint.create(groupProject);
  }
  updateGroupProject(groupProject: GroupProject): Observable<GroupProject>{
    return this.groupProjectsEndpoint.update(groupProject, groupProject.id);
  }
  deleteGroupProject(id: number): Observable<void>{
    return this.groupProjectsEndpoint.delete(id);
  }

}
