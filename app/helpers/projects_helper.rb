module ProjectsHelper
  @@locked_icon = "fa fa-lock"
  @@unlocked_icon = "fa fa-unlock"
  @@done_icon = "fa fa-check"
  @@undone_icon = "fa fa-times"

  def icon_class element, requirement = true
    return @@locked_icon unless requirement
    element.blank? ? @@unlocked_icon : @@done_icon
  end

  def icon_class_objective objective
    objective.cached_actors.blank? || objective.enabling_factors.blank? || objective.cached_outcomes.blank? || objective.project.cached_activities.blank? ? @@undone_icon : @@done_icon
  end

  def icon_class_outcome outcome
    #outcome.asks.blank? ? @@undone_icon : @@done_icon
    outcome.cached_asks_count < 1 ? @@undone_icon : @@done_icon
  end

  def icon_class_stage stage
    case stage
    when 1
      (@real_problem && @policy_problems && @solutions) ? "fa fa-check" : "fa fa-times"
    when 2
      #@objectives.blank? ? "fa fa-times" : "fa fa-check"
      @project.cached_prioritized_objectives_count < 1 ? "fa fa-times" : "fa fa-check"
    when 3
      ( @a_size > 0 && @factors_size > 0 && !@project.activities.nil? ) ? "fa fa-check" : "fa fa-times"
    end
  end

  def title_stage stage
    case stage
    when 1
      (@real_problem && @policy_problems && @solutions) ? t('projects.show.complete_stage_tooltip') : t('projects.show.incomplete_stage_tooltip')
    when 2
      #@objectives.blank? ? t('projects.show.incomplete_stage_tooltip') : t('projects.show.complete_stage_tooltip')
      @project.cached_prioritized_objectives_count < 1 ? t('projects.show.incomplete_stage_tooltip') : t('projects.show.complete_stage_tooltip')
    when 2
      ( @a_size > 0 && @factors_size > 0 && !@project.activities.nil? ) ? t('projects.show.complete_stage_tooltip') : t('projects.show.incomplete_stage_tooltip')
    end
  end

  def link_text element_symbol
    case element_symbol
    when :real_problem
      @real_problem.blank? ? t('projects.show.step1_description') : (@real_problem.title != "." ? @real_problem.title : t('projects.show.step1_description'))
    when :policy_problems
      @policy_problems.blank? ? t('projects.show.step2_description') : " #{@policy_problems.size} #{t('projects.show.causes')}"
    when :solutions
      @solutions.blank? ? t('projects.show.step3_description') : " #{@solutions.size} #{t('projects.show.solutions')}"
    when :objectives
      #@objectives.blank? ? t('projects.show.step4_description') : " #{@project.objectives.size} #{t('projects.show.objectives')},  #{@objectives.size} #{t('projects.show.objectives_prioritized')}"
      @project.cached_prioritized_objectives_count < 1 ? t('projects.show.step4_description') : " #{@project.cached_objectives_count} #{t('projects.show.objectives')},  #{@project.cached_prioritized_objectives_count} #{t('projects.show.objectives_prioritized')}"
    end
  end

  def objective_link_text objective, element_symbol
    case element_symbol
    when :actors
      objective.cached_actors.blank? ? t('projects.show.actors_description') : " #{objective.cached_actors.size} #{t('projects.show.actors')}"
    when :enabling_factors
      objective.enabling_factors.blank? ? t('projects.show.external_factors_description') : " #{objective.enabling_factors.size} #{t('projects.show.enabling_factors')}, #{objective.barriers.size} #{t('projects.show.barriers')}"
    when :outcomes
      objective.cached_outcomes.blank? ? t('projects.show.outcomes_description') : " #{objective.cached_outcomes.size} #{t('projects.show.outcomes')}"
    when :activities
      objective.cached_activities.blank? ? t('projects.show.activities_description') : " #{objective.cached_activities.size} #{t('projects.show.activities')}"
    when :activities_all
      objective.cached_activities.blank? ? t('projects.show.activities') : t('projects.show.activities')
    when :asks
      objective.cached_asks.blank? ? t('projects.show.asks_description') : " #{objective.cached_asks.size} #{t('projects.show.asks')}"
    end
  end

  def outcome_link_text outcome, element_symbol
    case element_symbol
    when :asks
      outcome.cached_asks.blank? ? t('projects.show.asks_description') : " #{outcome.cached_asks_count} #{t('projects.show.asks')}"
    end
  end

  def get_support support_id
    actor = Actor.new
    actor.actor_support_list.index(support_id)
  end

  def get_influence influence_id
    actor = Actor.new
    actor.actor_influence_level_list.index(influence_id)
  end

  def get_objective_related objective_id
    #obj = Objective.find(objective_id)
    obj = Objective.cache_find(objective_id)
    obj.title
  end
end
