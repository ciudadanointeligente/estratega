class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: [:show, :edit, :update, :destroy, :solutions, :public, :stage1, :stage2, :share, :overview, :unshare, :generate_massive_ical]

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
    
    @successful_asks = 0
    @neutral_asks = 0
    @failed_asks = 0
    @completed_asks = 0
    @rate_completed_asks = 0
    @rate_success_asks = 0
    @objectives_with_failed_asks = Array.new

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
    @outcomes_with_predefined_activities = Array.new
    @percentage_outcomes_with_predefined_activities = 0
    @outcome_activities_usually_associated = [
      {type: "Political will", values: ["Lobby", "Relationship building with decision makers", "Policymaker and candidate education", "Litigation or legal advocacy", "Policy proposal development", "Demonstration projects or pilots", "Earned media"]},
      {type: "Public will", values: ["Polling", "Rallies and marches", "Digital or internet-based media/social media"]},
      {type: "Attitudes or beliefs", values: ["Issue/policy analysis and research", "Polling", "Public service announcements", "Briefings/presentations"]},
      {type: "Salience", values: ["Lobby", "Relationship building with decision makers", "Policymaker and candidate education"]},
      {type: "Awareness", values: ["Public service announcements", "Rallies and marches", "Briefings/presentations", "Digital or internet-based media/social media"]},
      {type: "New champions", values: ["Relationship building with decision-makers", "Digital or internet-based media/social media"]},
      {type: "New advocates", values: ["Briefings/presentations"]},
      {type: "Partnerships or alliances", values: ["Issue/policy analysis and research", "Rallies and marches", "Grass-roots organizing and mobilization"]},
      {type: "Constituency or support-base growth", values: ["Rallies and marches", "Grass-roots organizing and mobilization"]},
      {type: "Media coverage", values: ["Rallies and marches", "Grass-roots organizing and mobilization", "Media partnerships", "Digital or internet-based media/social media"]},
      {type: "Issue reframing", values: ["Issue/policy analysis and research", "Earned media"]},
      {type: "Organizational advocacy capacity", values: ["Any of the others"]},
      {type: "Organizational visibility or issue recognition", values: ["Issue/policy analysis and research"]}
    ];
    
    ################################################################################## start asks kpis
    @success_asks_by_month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @neutral_asks_by_month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    @fail_asks_by_month = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    @project.asks.each do |ask|
      if !ask.indicator.nil?
        @completed_asks = @completed_asks + 1
        if !ask.indicator.percentage.nil?
          if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
            @successful_asks = @successful_asks + 1
          elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
            @neutral_asks = @neutral_asks + 1
          elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
            @failed_asks = @failed_asks + 1
            @objectives_with_failed_asks << ask.objective
          end
        end
        if ( ask.indicator.updated_at.strftime("%Y") == today.strftime("%Y") )
            if ask.indicator.updated_at.strftime("%B") == "January"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[0] = @success_asks_by_month[0] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[0] = @neutral_asks_by_month[0] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[0] = @fail_asks_by_month[0] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "February"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[1] = @success_asks_by_month[1] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[1] = @neutral_asks_by_month[1] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[1] = @fail_asks_by_month[1] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "March"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[2] = @success_asks_by_month[2] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[2] = @neutral_asks_by_month[2] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[2] = @fail_asks_by_month[2] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "April"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[3] = @success_asks_by_month[3] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[3] = @neutral_asks_by_month[3] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[3] = @fail_asks_by_month[3] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "May"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[4] = @success_asks_by_month[4] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[4] = @neutral_asks_by_month[4] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[4] = @fail_asks_by_month[4] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "June"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[5] = @success_asks_by_month[5] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[5] = @neutral_asks_by_month[5] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[5] = @fail_asks_by_month[5] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "July"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[6] = @success_asks_by_month[6] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[6] = @neutral_asks_by_month[6] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[6] = @fail_asks_by_month[6] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "August"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[7] = @success_asks_by_month[7] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[7] = @neutral_asks_by_month[7] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[7] = @fail_asks_by_month[7] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "September"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[8] = @success_asks_by_month[8] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[8] = @neutral_asks_by_month[8] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[8] = @fail_asks_by_month[8] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "October"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[9] = @success_asks_by_month[9] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[9] = @neutral_asks_by_month[9] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[9] = @fail_asks_by_month[9] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "November"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[10] = @success_asks_by_month[10] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[10] = @neutral_asks_by_month[10] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[10] = @fail_asks_by_month[10] + 1
                end
              end
            elsif ask.indicator.updated_at.strftime("%B") == "December"
              if !ask.indicator.percentage.nil?
                if ( ask.indicator.percentage >= 60 && ask.indicator.percentage <= 100 )
                   @success_asks_by_month[11] = @success_asks_by_month[11] + 1
                elsif ( ask.indicator.percentage >= 39 && ask.indicator.percentage <= 59 )
                  @neutral_asks_by_month[11] = @neutral_asks_by_month[11] + 1
                elsif ( ask.indicator.percentage >= 0 && ask.indicator.percentage <= 38 )
                  @fail_asks_by_month[11] = @fail_asks_by_month[11] + 1
                end
              end
            end
          end
      end
    end
    
    if @project.asks.count == 0
      @rate_completed_asks = 0
      @rate_success_asks = 0
    else
      @rate_completed_asks = ( 100 / @project.asks.count ) * @completed_asks
      @rate_success_asks = ( 100 / @project.asks.count ) * @successful_asks
    end
    ################################################################################## end asks kpis
    ################################################################################## start objective kpis
    
    ################################################################################## end objective kpis
    ################################################################################## start outcome kpis
    
    ################################################################################## end outcome kpis

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
      

      # start activities kpis
      @project.activities.each do |ac|
        if !ac.indicator.nil?
          if !ac.indicator.percentage.nil?
            if ( ac.indicator.percentage >= 60 && ac.indicator.percentage <= 100 )
              @successful_activities = @successful_activities + 1
            elsif ( ac.indicator.percentage >= 39 && ac.indicator.percentage <= 59 )
              @neutral_activities = @neutral_activities + 1
            elsif ( ac.indicator.percentage >= 0 && ac.indicator.percentage <= 38 )
              @failed_activities = @failed_activities + 1
              @objectives_with_failed_activities << ac.objective
            end
          end
        end

        if !ac.start_date.blank?
          if ac.start_date.to_datetime < today
            @outcomes_with_overdue_activities = @outcomes_with_overdue_activities + 1
          elsif ac.start_date.to_datetime > near_future
            @outcomes_without_upcoming_activities = @outcomes_without_upcoming_activities + 1
          end

          if ( ac.start_date.to_datetime < today && ac.completion == false )
            @overdue_activities = @overdue_activities + 1
          elsif ( ac.start_date.to_datetime > today && ac.completion == false )
            @unfinished_activities = @unfinished_activities + 1
          end
          # ac.outcomes.each do |outcome|
          #   @assigned_outcomes << outcome
          # end

          if ac.completion == true
            @completed_activities = @completed_activities + 1
          end

          if ac.start_date.to_datetime > today
            @upcoming_activities << ac
          end
        end

        if !ac.activity_types.nil?
          if @outcomes_with_predefined_activities.size > 0 && @outcomes_size.size > 0
            @percentage_outcomes_with_predefined_activities = ( 100 / @outcomes_size ) / @outcomes_with_predefined_activities.uniq{|x| x.id}.count
          end
        end

      end
      # end activities kpis
      @state_of_activities_this_year << @current_state_per_objective
      #puts @state_of_activities_this_year
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

        # o.activities.each do |ac|
        #   if !ac.completion
        #     ac.outcomes.each do |outcome|
        #       @outcomes_not_completed << outcome
        #     end
        #   end
        #   if !ac.indicator.nil?
        #       if ( (!ac.indicator.percentage.nil? ? ac.indicator.percentage : 0) >= 60 && (!ac.indicator.percentage.nil? ? ac.indicator.percentage : 0) <= 100 )
        #         ac.outcomes.each do |outcome|
        #           @outcomes_achieved << outcome
        #         end
        #       else
        #         ac.outcomes.each do |outcome|
        #           @outcomes_failed << outcome
        #         end
        #       end
        #   end
        # end

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
      @project.save

      permission = Permission.find_by_project_id_and_user_id(@project.id,current_user.id)
      set_permission = Permission.find(permission.id)
      set_permission.role = :owner
      set_permission.save
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
          data_send = {email: new_user.email, message: message, token: raw_token, project: @project, subdomain: request.subdomain}
          UserMailer.new_user_share(data_send).deliver_now
        end
      else
        if !@project.users.include? share_user
          @project.users << share_user
        end
        is_owner = Permission.where(project_id: @project.id ).where(user_id: share_user.id).first.role == 'owner'
        puts Permission.where(project_id: @project.id ).where(user_id: share_user.id).first.inspect
        puts Permission.where(project_id: @project.id ).where(user_id: share_user.id).first.role
        puts is_owner
        unless is_owner
          permission = Permission.where(project_id: @project.id ).where(user_id: share_user.id).first
          permission.role = :collaborator
          if permission.save
            data_send = {email: share_user.email, message: message, project: @project, subdomain: request.subdomain}
            UserMailer.exist_user_share(data_send).deliver_now
          end
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

  def unshare
    user_id = params[:user_id]
    @project.users.delete(user_id)
    respond_with(@project)
  end
  
  def generate_massive_ical
    cal = @project.as_ical
    headers['Content-Type'] = "text/calendar; charset=UTF-8"
    render :layout => false, :text => cal
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
