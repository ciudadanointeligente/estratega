module ProjectsHelper
  @@locked_icon = "fa fa-lock"
  @@unlocked_icon = "fa fa-unlock"
  @@done_icon = "fa fa-check"

  def icon_class element, requirement = true
    return @@locked_icon unless requirement
    element.blank? ? @@unlocked_icon : @@done_icon
  end

  def icon_class_stage stage
    case stage
    when 1
      (@real_problem && @policy_problems && @solutions) ? "fa fa-check" : "fa fa-times"
    when 2
      @objectives.blank? ? "fa fa-times" : "fa fa-check"
    when 3
      ( @a_size > 0 && @factors_size > 0 && !@project.activities.nil? ) ? "fa fa-check" : "fa fa-times"
    end
  end

  def title_stage stage
    case stage
    when 1
      (@real_problem && @policy_problems && @solutions) ? t('projects.show.complete_stage_tooltip') : t('projects.show.incomplete_stage_tooltip')
    when 2
      @objectives.blank? ? t('projects.show.incomplete_stage_tooltip') : t('projects.show.complete_stage_tooltip')
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
      @objectives.blank? ? t('projects.show.step4_description') : " #{@objectives.size} #{t('projects.show.objectives')}"
    end
  end

  def objective_link_text objective, element_symbol
    case element_symbol
    when :actors
      objective.actors.blank? ? t('projects.show.actors_description') : " #{objective.actors.size} #{t('projects.show.actors')}"
    when :enabling_factors
      objective.enabling_factors.blank? ? t('projects.show.external_factors_description') : " #{objective.enabling_factors.size} #{t('projects.show.enabling_factors')}, #{objective.barriers.size} #{t('projects.show.barriers')}"
    when :outcomes
      objective.outcomes.blank? ? t('projects.show.outcomes_description') : " #{objective.outcomes.size} #{t('projects.show.outcomes')}"
    when :activities
      objective.activities.blank? ? t('projects.show.activities_description') : " #{objective.activities.size} #{t('projects.show.activities')}"
    when :asks
      objective.asks.blank? ? t('projects.show.asks_description') : " #{objective.asks.size} #{t('projects.show.asks')}"
    end
  end
  
  def outcome_link_text outcome, element_symbol
    case element_symbol
    when :asks
      outcome.asks.blank? ? t('projects.show.asks_description') : " #{outcome.asks.size} #{t('projects.show.asks')}"
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
    obj = Objective.find(objective_id)
    obj.title
  end
end
