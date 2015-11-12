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

  def link_text element_symbol
    case element_symbol
    when :real_problem
      @real_problem.blank? ? 'Articular el problema del mundo real que se desea abordar' : (@real_problem.title != "." ? @real_problem.title : 'Articular el problema del mundo real que se desea abordar')
    when :policy_problems
      @policy_problems.blank? ? "Identificar los dimensiones políticas del problema" : " #{@policy_problems.size} Problemas políticos"
    when :solutions
      @solutions.blank? ? "Soluciones políticas: Describir las principales soluciones políticas que pudieran constituir una respuesta adecuada" : " #{@solutions.size} Soluciones"
    when :objectives
      @objectives.blank? ? 'Añada y priorice objetivos' : " #{@objectives.size} Objectivos"
    end
  end

  def objective_link_text objective, element_symbol
    case element_symbol
    when :actors
      objective.actors.blank? ? "Lista de Actores y Mapa de Poder" : " #{objective.actors.size} Actores"
    when :enabling_factors
      objective.enabling_factors.blank? ? "Identificado 0 factores habilitantes y #{objective.barriers.size} barreras" : " #{objective.enabling_factors.size} Factores habilitantes and #{objective.barriers.size} Barreras"
    when :outcomes
      objective.outcomes.blank? ? "Defina metas intermedias" : " #{objective.outcomes.size} Metas Intermedias"
    when :activities
      objective.activities.blank? ? "Defina actividades" : " #{objective.activities.size} Actividades"
    when :asks
      objective.asks.blank? ? "Defina peticiones" : " #{objective.asks.size} Peticiones"
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
