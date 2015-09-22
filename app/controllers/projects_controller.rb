class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :edit, :update, :destroy, :solutions, :public, :stage1, :stage2, :share, :overview]

  respond_to :html, :json

  def stage1
  end

  def stage2
  end

  def solutions
    @solutions = []
    if !@project.real_problem.blank?
      @project.real_problem.policy_problems.each do |pp|
        pp.solutions.map {|s| @solutions << s}
      end
    end
    # respond_with(@project, @solutions)
    render template: 'solutions/index.json.jbuilder'
  end

  def index
    @projects = current_user.projects
    if params[:public]
      my_projects = current_user.projects
      public_projects = Project.where(public: :true)
      @projects = public_projects - my_projects
    end
    respond_with(@projects)
  end

  def show
    authorize @project
    @objectives = @project.objectives.where('prioritized = true')
    @a_size = 0
    @barriers_size = 0
    @factors_size = 0
    @outcomes_size = 0

    @outcomes = Array.new
    @assigned_outcomes = Array.new
    @successful_activities = 0
    @neutral_activities = 0
    @failed_activities = 0

    today = DateTime.now
    near_future = DateTime.now + 3.weeks
    @outcomes_without_activities = 0
    @outcomes_without_upcoming_activities = 0
    @outcomes_with_overdue_activities = 0
    @objectives_without_outcomes = 0
    @objectives_with_failed_activities_diff = 0
    @objectives_with_failed_activities = Array.new
    @completed_activities = 0
    @rate_completed_activities = 0
    @rate_success_activities = 0
    @overdue_activities = 0
    @unfinished_activities = 0
    @upcoming_activities = Array.new
    @state_of_activities_this_year = Array.new

    @objectives.each do |o|
      @a_size = @a_size + o.actors.size
      @barriers_size = @barriers_size + o.barriers.size
      @factors_size = @factors_size + o.enabling_factors.size
      @outcomes_size = @outcomes_size + o.outcomes.size

      if o.outcomes.blank?
        @objectives_without_outcomes = @objectives_without_outcomes + 1
      end

      o.outcomes.each do |outcome|
        @outcomes << outcome
      end

      @current_state_per_objective = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      o.activities.each do |ac|
        if !ac.indicator.nil?
          if ( ac.indicator.percentage >= 60 && ac.indicator.percentage <= 100 )
            @successful_activities = @successful_activities + 1
          elsif ( ac.indicator.percentage >= 39 && ac.indicator.percentage <= 59 )
            @neutral_activities = @neutral_activities + 1
          elsif ( ac.indicator.percentage >= 0 && ac.indicator.percentage <= 38 )
            @failed_activities = @failed_activities + 1
            @objectives_with_failed_activities << ac.objective
          end
        end

        if !ac.scheduling.blank?
          if ac.scheduling.to_datetime < today
            @outcomes_with_overdue_activities = @outcomes_with_overdue_activities + 1
          elsif ac.scheduling.to_datetime > near_future
            @outcomes_without_upcoming_activities = @outcomes_without_upcoming_activities + 1
          end

          if ( ac.scheduling.to_datetime < today && ac.completion == false )
            @overdue_activities = @overdue_activities + 1
          elsif ( ac.scheduling.to_datetime > today && ac.completion == false )
            @unfinished_activities = @unfinished_activities + 1
          end
          ac.outcomes.each do |outcome|
            @assigned_outcomes << outcome
          end

          if ac.completion == true
            @completed_activities = @completed_activities + 1
          end

          if ac.scheduling.to_datetime > today
            @upcoming_activities << ac
          end

          if ( ac.scheduling.strftime("%Y") == today.strftime("%Y") )
            if ac.scheduling.strftime("%B") == "January"
              @current_state_per_objective[0] = @current_state_per_objective[0] + 1
            elsif ac.scheduling.strftime("%B") == "February"
              @current_state_per_objective[1] = @current_state_per_objective[1] + 1
            elsif ac.scheduling.strftime("%B") == "March"
              @current_state_per_objective[2] = @current_state_per_objective[2] + 1
            elsif ac.scheduling.strftime("%B") == "April"
              @current_state_per_objective[3] = @current_state_per_objective[3] + 1
            elsif ac.scheduling.strftime("%B") == "May"
              @current_state_per_objective[4] = @current_state_per_objective[4] + 1
            elsif ac.scheduling.strftime("%B") == "June"
              @current_state_per_objective[5] = @current_state_per_objective[5] + 1
            elsif ac.scheduling.strftime("%B") == "July"
              @current_state_per_objective[6] = @current_state_per_objective[6] + 1
            elsif ac.scheduling.strftime("%B") == "August"
              @current_state_per_objective[7] = @current_state_per_objective[7] + 1
            elsif ac.scheduling.strftime("%B") == "September"
              @current_state_per_objective[8] = @current_state_per_objective[8] + 1
            elsif ac.scheduling.strftime("%B") == "October"
              @current_state_per_objective[9] = @current_state_per_objective[9] + 1
            elsif ac.scheduling.strftime("%B") == "November"
              @current_state_per_objective[10] = @current_state_per_objective[10] + 1
            elsif ac.scheduling.strftime("%B") == "December"
              @current_state_per_objective[11] = @current_state_per_objective[11] + 1
            end
          end
        end
      end
      @state_of_activities_this_year << @current_state_per_objective
    end
    @objectives_with_failed_activities_diff = @objectives_with_failed_activities.uniq{|x| x.id}.size
    @outcomes_without_activities = @outcomes.uniq{|x| x.id}.size - @assigned_outcomes.uniq{|x| x.id}.size
    @upcoming_activities = @upcoming_activities.uniq{|x| x.id}

    if @project.activities.count == 0
      @rate_completed_activities = 0
      @rate_success_activities = 0
    else
      @rate_completed_activities = ( 100 / @project.activities.count ) * @completed_activities
      @rate_success_activities = ( 100 / @project.activities.count ) * @successful_activities
    end

    if !@project.real_problem.blank?
      @real_problem = @project.real_problem
      if !@project.real_problem.try(:policy_problems).try(:blank?)
        @policy_problems = @project.real_problem.policy_problems
        if !@project.real_problem.try(:get_solutions).try(:blank?)
          @solutions = @project.real_problem.get_solutions
        end
      end
    end

    @objectives_prioritized = @project.objectives.where('prioritized = true')
    @advance_priority_objectives = 0
    @advance_total_objectives = 0
    @percentage_outcomes_achieved = 0

    if @objectives_prioritized.count > 0
      @objectives_completed = 0
      @outcomes_achieved = Array.new
      @outcomes_failed = Array.new

      @objectives_prioritized.each do |o|
        @outcomes_per_objective = Array.new
        @outcomes_not_completed = Array.new

        o.outcomes.each do |outcome|
          @outcomes_per_objective << outcome
        end

        o.activities.each do |ac|
          if !ac.completion
            ac.outcomes.each do |outcome|
              @outcomes_not_completed << outcome
            end
          end
          if !ac.indicator.nil?
            if ( ac.indicator.percentage >= 60 && ac.indicator.percentage <= 100 )
              ac.outcomes.each do |outcome|
                @outcomes_achieved << outcome
              end
            else
              ac.outcomes.each do |outcome|
                @outcomes_failed << outcome
              end
            end
          end
        end

        outcomes_diff = @outcomes_per_objective.uniq{|x| x.id} - @outcomes_not_completed.uniq{|x| x.id}
        if outcomes_diff.count > 0
          @objectives_completed = @objectives_completed + 1
        end

      end
      @advance_priority_objectives = ( 100 / @objectives_prioritized.count ) * @objectives_completed
      @advance_total_objectives =  ( 100 / @project.objectives.count ) * @objectives_completed
    end
    if !@outcomes_achieved.nil? && @outcomes_achieved.size > 0
      outcomes_diff = @outcomes_achieved.uniq{|x| x.id} - @outcomes_failed.uniq{|x| x.id}
      @percentage_outcomes_achieved = ( 100 / @outcomes.count ) * outcomes_diff.count
    end

    # @policy_problems = @project.real_problem.policy_problems || PolicyProblem.none
    # @solutions = @project.real_problem.policy_problems.first.solutions || Solution.none
    respond_with(@project)
  end

  def new
    @project = Project.new
    respond_with(@project)
  end

  def edit
  end

  def create
    new_params = project_params
    new_params[:public] = false if new_params[:public].nil?
    @project = Project.create(new_params)

    if !@project.id.blank?
      @project.users << current_user

      permission = Permission.where(project_id: @project.id ).where(user_id: current_user.id).first
      permission.role = :owner
      permission.save
    end

    respond_with(@project)
  end

  def update
    new_params = project_params
    new_params[:public] = false if new_params[:public].nil?
    @project.update(new_params)
    respond_with(@project)
  end

  def destroy
    @project.destroy
    respond_with(@project)
  end

  def share
    message = params[:message]
    params[:share_users].split(",").each do |u|
      u = u.to_s.strip
      share_user = User.find_by_email(u)
      if share_user.blank?
        generated_password = Devise.friendly_token.first(8)
        new_user = User.create(email: u, password: generated_password)
        raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
        new_user.reset_password_token = hashed_token
        new_user.reset_password_sent_at = Time.now.utc
        new_user.save
        @project.users << new_user

        permission = Permission.where(project_id: @project.id ).where(user_id: new_user.id).first
        permission.role = :collaborator
        if permission.save
          data_send = {email: new_user.email, message: message, token: raw_token, project: @project}
          UserMailer.new_user_share(data_send).deliver_now
        end
      else
        if !@project.users.include? share_user
          @project.users << share_user
        end

        permission = Permission.where(project_id: @project.id ).where(user_id: share_user.id).first
        permission.role = :collaborator
        if permission.save
          data_send = {email: share_user.email, message: message, project: @project}
          UserMailer.exist_user_share(data_send).deliver_now
        end
      end
    end
    respond_with(@project)
  end

  def overview
    @objectives = @project.objectives.where('prioritized = true')
    @a_size = 0
    @barriers_size = 0
    @factors_size = 0
    @outcomes_size = 0
    @objectives.each do |o|
      @a_size = @a_size + o.actors.size
      @barriers_size = @barriers_size + o.barriers.size
      @factors_size = @factors_size + o.enabling_factors.size
      @outcomes_size = @outcomes_size + o.outcomes.size
    end

    if !@project.real_problem.blank?
      @real_problem = @project.real_problem
      if !@project.real_problem.try(:policy_problems).try(:blank?)
        @policy_problems = @project.real_problem.policy_problems
        if !@project.real_problem.try(:get_solutions).try(:blank?)
          @solutions = @project.real_problem.get_solutions
        end
      end
    end
    respond_with(@project)
  end

  private
    def set_project
      @project = Project.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        redirect_to(new_project_path, :notice => 'Project not found')
    end

    def project_params
      params[:project].permit(:title, :description, :public, :focus_area)
    end
end
